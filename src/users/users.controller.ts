import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  HttpCode,
  Delete,
  Put,
} from '@nestjs/common';
import { dateToArray } from 'src/shared/date.helper';
import { User } from './interfaces/user.interface';
import { UsersDataService } from './users-data-service';
import { ExternalUserDto } from './dto/external-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UsersDataService) {}
  @Get(':id') getUserById(@Param('id') _id_: string): ExternalUserDto {
    return this.mapUserToExternal(this.userRepository.getUserById(_id_));
  }

  @Get()
  getAllUsers(): Array<User> {
    return this.userRepository.getAllUsers();
  }

  @Post()
  addUser(@Body() item: CreateUserDto): ExternalUserDto {
    return this.mapUserToExternal(this.userRepository.addUser(item));
  }

  mapUserToExternal(user: User): ExternalUserDto {
    return {
      ...user,
      birthday: dateToArray(user.birthday),
    };
  }

  @Delete(':id') @HttpCode(204) deleteUser(@Param('id') _id_: string): void {
    this.userRepository.deleteUser(_id_);
  }

  @Put(':id')
  updateUser(
    @Param('id') _id_: string,
    @Body() item: UpdateUserDto,
  ): ExternalUserDto {
    return this.mapUserToExternal(this.userRepository.updateUser(_id_, item));
  }
}
