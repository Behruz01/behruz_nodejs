import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/database/postgres/entities/user.entity';
import { UserRepo } from 'src/database/postgres/repositories/user.repo';
import { LoginDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/shared/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    @InjectRepository(UsersEntity) private readonly userRepo: UserRepo,
  ) {}

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const { email, password } = loginDto;
      const findUser = await this.userRepo.findOne({ where: { email } });

      if (!findUser) {
        throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
      }

      const verifyPass = await bcrypt.compare(password, findUser.password);
      if (!verifyPass) {
        throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
      }

      const accessToken = this.tokenService.createAccessToken(findUser);
      const refreshToken = await this.tokenService.createRefreshToken(findUser);
      return { accessToken, refreshToken };
    } catch (error) {
      throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async register(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const { email, password } = loginDto;
      const findUser = await this.userRepo.findOne({ where: { email } });

      if (findUser) {
        throw new HttpException('User already exists!', HttpStatus.CONFLICT);
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = this.userRepo.create({ email, password: hashedPassword });
      await this.userRepo.save(newUser);

      const accessToken = this.tokenService.createAccessToken(newUser);
      const refreshToken = await this.tokenService.createRefreshToken(newUser);
      return { accessToken, refreshToken };
    } catch (error) {
      throw new HttpException(
        'Registration failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async superadminLogin(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = loginDto;

    let findAdmin = await this.userRepo.findOne({ where: { email } });
    if (!findAdmin) {
      if (
        email === 'ibragimovbehruz822@gmail.com' &&
        password === 'superadmin'
      ) {
        const hashPass = await bcrypt.hash(password, 12);
        const superAdmin = this.userRepo.create({
          email,
          password: hashPass,
          role: 'superAdmin',
        });
        await this.userRepo.save(superAdmin);
        findAdmin = superAdmin;
      } else {
        throw new HttpException('Admin not found!', HttpStatus.BAD_REQUEST);
      }
    } else {
      const verifyPass = await bcrypt.compare(password, findAdmin.password);
      if (!verifyPass) {
        throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
      }
    }

    const accessToken = this.tokenService.createAccessToken(findAdmin);
    const refreshToken = await this.tokenService.createRefreshToken(findAdmin);
    return { accessToken, refreshToken };
  }
}
