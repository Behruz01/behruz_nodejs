import { Repository } from 'typeorm';
import { UsersEntity } from '../entities/user.entity';

export type UserRepo = Repository<UsersEntity>;
