import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthControllerV1 } from './auth.controller';
import { UsersEntity } from 'src/database/postgres/entities/user.entity';
import { ConfigService } from 'src/config/config.service';
import { TokenService } from 'src/shared/token.service';
import { RedisService } from 'src/shared/redis.service';
import { JwtService } from 'src/shared/jwt.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [AuthControllerV1],
  providers: [
    AuthService,
    TokenService,
    JwtService,
    ConfigService,
    RedisService,
  ],
  exports: [],
})
export class AuthModule {}
