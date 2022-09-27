import { Controller, Get, Param } from '@nestjs/common';
import { dateToArray } from 'src/shared/date.helper';
import { User } from './interfaces/user.interface';
import { UsersDataService } from './users-data-service';
import { ExternalUserDto } from './dto/external-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UsersDataService) {}
  @Get(':id') getUserById(@Param('id') _id_: string): ExternalUserDto {
    return this.mapUserToExternal(this.userRepository.getUserById(_id_));
  }

  mapUserToExternal(user: User): ExternalUserDto {
    return {
      ...user,
      birthday: dateToArray(user.birthday),
    };
  }
}
