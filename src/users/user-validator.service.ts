import { Injectable } from '@nestjs/common';
import { UserRequireUniqueEmailException } from './exception/user-require-unique-email-exception';
import { UserRepository } from './db/users.repository';

@Injectable()
export class UserValidatorService {
  constructor(private userRepository: UserRepository) {}

  async validateUniqueEmail(email: string): Promise<void> {
    const usr = await this.userRepository.getUserByEmail(email);
    if (usr) {
      throw new UserRequireUniqueEmailException();
    }
  }
}
