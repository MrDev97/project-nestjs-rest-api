import { Injectable } from '@nestjs/common';
import { UserRequireUniqueEmailException } from './exception/user-require-unique-email-exception';
import { UsersDataService } from './users-data-service';

@Injectable()
export class UserValidatorService {
  constructor(private userService: UsersDataService) {}
  validateUniqueEmail(email: string): void {
    const usr = this.userService.getUserByEmail(email);
    if (usr) {
      throw new UserRequireUniqueEmailException();
    }
  }
}
