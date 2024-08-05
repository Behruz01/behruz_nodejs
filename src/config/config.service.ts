import { Injectable } from '@nestjs/common';
import config from './config.schema';

@Injectable()
export class ConfigService {
  get port(): number {
    return config.get('port');
  }

  get databaseHost(): string {
    return config.get('database.host');
  }

  get databasePort(): number {
    return config.get('database.port');
  }

  get databaseName(): string {
    return config.get('database.name');
  }

  get databaseUser(): string {
    return config.get('database.user');
  }

  get databasePassword(): string {
    return config.get('database.password');
  }

  get jwtSecret(): string {
    return config.get('jwtSecret');
  }

  get defaultLanguage(): string {
    return config.get('defaultLanguage');
  }
}
