import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import config from './config/config.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionFilter } from './common/exception/exception.filter';
import { AuthModule } from './modules/auth/auth.module';
import { UsersEntity } from './database/postgres/entities/user.entity';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '24h' },
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.get('database.host'),
      port: config.get('database.port'),
      username: config.get('database.user'),
      password: config.get('database.password'),
      database: config.get('database.name'),
      synchronize: true,
      logging: false,
      autoLoadEntities: true,
      entities: [UsersEntity],
    }),

    AuthModule,
  ],
  controllers: [],
  providers: [
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
  ],
  exports:[ConfigService]
})
export class AppModule {}
