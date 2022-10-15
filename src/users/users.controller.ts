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
import { dateToArray } from 'src/shared/date.helper';
import { User } from './interfaces/user.interface';
import { UsersDataService } from './users-data-service';
import { ExternalUserDto } from './dto/external-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserValidatorService } from './user-validator.service';

@Controller('users')
export class UsersController {
  constructor(
    private userRepository: UsersDataService,
    private userValidator: UserValidatorService,
  ) {}

  @Get(':id') getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): ExternalUserDto {
    return this.mapUserToExternal(this.userRepository.getUserById(id));
  }

  @Get()
  getAllUsers(): Array<User> {
    return this.userRepository.getAllUsers();
  }

  @Post()
  addUser(@Body() item: CreateUserDto): ExternalUserDto {
    this.userValidator.validateUniqueEmail(item.email);
    return this.mapUserToExternal(this.userRepository.addUser(item));
  }

  mapUserToExternal(user: User): ExternalUserDto {
    return {
      ...user,
      dateOfBirth: dateToArray(user.dateOfBirth),
    };
  }

  @Delete(':id') @HttpCode(204) deleteUser(@Param('id') _id_: string): void {
    this.userRepository.deleteUser(_id_);
  }

  @Put(':id')
  updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() item: UpdateUserDto,
  ): ExternalUserDto {
    return this.mapUserToExternal(this.userRepository.updateUser(id, item));
  }
}
