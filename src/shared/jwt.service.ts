import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { UserObject } from '../common/interfaces/jwt.interface';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class JwtService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: NestJwtService,
  ) {}

  createAccessToken(user: UserObject): string {
    try {
      return this.jwtService.sign(
        { id: user.id, role: user.role },
        {
          secret: this.configService.jwtSecret,
          expiresIn: '10m',
        },
      );
    } catch (error) {
      throw new HttpException(
        'Failed to create access token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  createRefreshToken(user: UserObject): string {
    try {
      return this.jwtService.sign(
        { id: user.id, role: user.role },
        {
          secret: this.configService.jwtSecret,
          expiresIn: '10h',
        },
      );
    } catch (error) {
      throw new HttpException(
        'Failed to create refresh token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.jwtSecret,
      });
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
