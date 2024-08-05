import * as dotenv from 'dotenv';
import * as path from 'path';
import convict = require('convict');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = convict({
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
  },
  database: {
    host: {
      doc: 'Database host name/IP',
      format: String,
      default: 'localhost',
      env: 'DB_HOST',
    },
    port: {
      doc: 'Database port',
      format: 'port',
      default: 5432,
      env: 'DB_PORT',
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'mapme',
      env: 'DB_NAME',
    },
    user: {
      doc: 'Database user',
      format: String,
      default: 'postgres',
      env: 'DB_USER',
    },
    password: {
      doc: 'Database password',
      format: String,
      default: '2002',
      env: 'DB_PASSWORD',
      sensitive: true,
    },
  },
  jwtSecret: {
    doc: 'JWT Secret',
    format: String,
    default: 'supersecretkey',
    env: 'JWT_SECRET',
    sensitive: true,
  },
  defaultLanguage: {
    env: 'DEFAULT_LANGUAGE',
    doc: 'Default language',
    format: String,
    default: 'en',
  },
});

config.validate({ allowed: 'strict' });

export default config;
