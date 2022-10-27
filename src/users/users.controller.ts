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
import { User } from './db/users.entity';
import { UsersDataService } from './users-data-service';
import { CreateUserDto } from './dto/create-user.dto';
import { ExternalUserDto } from './dto/external-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserValidatorService } from './user-validator.service';
import { dateToArray } from 'src/shared/date.helper';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersDataService,
    private userValidator: UserValidatorService,
  ) {}

  @Get(':id') async getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalUserDto> {
    return this.mapUserToExternal(await this.userService.getUserById(id));
  }

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  async addUser(@Body() item: CreateUserDto): Promise<ExternalUserDto> {
    // this.userValidator.validateUniqueEmail(item.email);
    return this.mapUserToExternal(await this.userService.addUser(item));
  }

  mapUserToExternal(user: User): ExternalUserDto {
    return {
      ...user,
      dateOfBirth: dateToArray(new Date(user.dateOfBirth)),
    };
  }

  @Delete(':id') @HttpCode(204) deleteUser(@Param('id') _id_: string): void {
    this.userService.deleteUser(_id_);
  }

  @Put(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() item: UpdateUserDto,
  ): Promise<ExternalUserDto> {
    return this.mapUserToExternal(await this.userService.updateUser(id, item));
  }
}
