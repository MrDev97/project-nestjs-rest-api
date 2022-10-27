import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  HttpCode,
  Delete,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UsersDataService } from './users-data-service';
import { CreateUserDto } from './dto/create-user.dto';
import { ExternalUserDto } from './dto/external-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserValidatorService } from './user-validator.service';
import { dateToArray } from 'src/shared/date.helper';
import { UserRepository } from './db/users.repository';
import { UserAddressRepository } from './db/userAddress.repository';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersDataService,
    private userValidator: UserValidatorService,
    private userRepository: UserRepository,
    private userAddressRepository: UserAddressRepository,
  ) {}

  @Get(':id') getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): ExternalUserDto {
    return this.mapUserToExternal(this.userService.getUserById(id));
  }

  @Get()
  getAllUsers(): Array<User> {
    return this.userService.getAllUsers();
  }

  @Post()
  addUser(@Body() item: CreateUserDto): ExternalUserDto {
    this.userValidator.validateUniqueEmail(item.email);
    return this.mapUserToExternal(this.userService.addUser(item));
  }

  mapUserToExternal(user: User): ExternalUserDto {
    return {
      ...user,
      dateOfBirth: dateToArray(user.dateOfBirth),
    };
  }

  @Delete(':id') @HttpCode(204) deleteUser(@Param('id') _id_: string): void {
    this.userService.deleteUser(_id_);
  }

  @Put(':id')
  updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() item: UpdateUserDto,
  ): ExternalUserDto {
    return this.mapUserToExternal(this.userService.updateUser(id, item));
  }
}
