import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { RedisService } from './redis.service';
import { UserObject } from '../common/interfaces/jwt.interface';
import { LogoutDto } from 'src/modules/auth/dto/create-auth.dto';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  createAccessToken(user: UserObject): string {
    return this.jwtService.createAccessToken(user);
  }

  async createRefreshToken(user: UserObject): Promise<string> {
    await this.redisService.connect();

    try {
      const refreshToken = this.jwtService.createRefreshToken(user);

      const payload = this.jwtService.verifyToken(refreshToken);
      const key = `${payload.id}:refreshToken`;

      await this.redisService.set(key, refreshToken, 86400);

      return refreshToken;
    } catch (error) {
      throw new HttpException(
        'Failed to create or store refresh token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await this.redisService.disconnect();
    }
  }

  async refresh(tokenDto: LogoutDto): Promise<{ accessToken: string }> {
    await this.redisService.connect();

    try {
      const { refreshToken } = tokenDto;

      if (!refreshToken) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const payload = this.jwtService.verifyToken(refreshToken);
      const key = `${payload.id}:refreshToken`;
      const storedToken = await this.redisService.get(key);

      if (!storedToken || storedToken !== refreshToken) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const newAccessToken = this.jwtService.createAccessToken(payload);
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new HttpException(
        'Token refresh failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await this.redisService.disconnect();
    }
  }

  async logout(logoutDto: LogoutDto): Promise<{ message: string }> {
    await this.redisService.connect();

    try {
      const { refreshToken } = logoutDto;

      if (!refreshToken) {
        throw new HttpException(
          'Token is required for logout',
          HttpStatus.BAD_REQUEST,
        );
      }

      const payload = this.jwtService.verifyToken(refreshToken);
      const key = `${payload.id}:refreshToken`;
      const redisResult = await this.redisService.del(key);

      if (redisResult === 0) {
        throw new HttpException(
          'Failed to remove token from Redis',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return { message: 'Logout successful' };
    } catch (error) {
      throw new HttpException(
        'Logout failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await this.redisService.disconnect();
    }
  }
}
