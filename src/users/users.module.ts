import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersDataService } from './users-data-service';
import { UserValidatorService } from './user-validator.service';
import { UserRepository } from './db/users.repository';
import { UserAddressRepository } from './db/userAddress.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './db/users.entity';

@Module({
  controllers: [UsersController],
  providers: [
    UsersDataService,
    UserValidatorService,
    UserRepository,
    UserAddressRepository,
  ],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
