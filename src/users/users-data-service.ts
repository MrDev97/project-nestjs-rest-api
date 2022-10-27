import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './db/users.repository';
import { UserAddressRepository } from './db/userAddress.repository';

@Injectable()
export class UsersDataService {
  constructor(
    private userRepository: UserRepository,
    private userAddressRepository: UserAddressRepository,
  ) {}

  // addUser(newUser: CreateUserDto): User {
  //   const savedUser = {
  //     ...newUser,
  //     id: uuidv4(),
  //   };

  //   this.users.push(savedUser);
  //   return savedUser;
  // }

  async deleteUser(id: string): Promise<void> {
    this.userRepository.delete(id);
  }

  // updateUser(id: string, dto: UpdateUserDto): User {
  //   const user = this.getUserById(id);

  //   if (user) {
  //     return {
  //       ...user,
  //       ...dto,
  //       id: user.id,
  //     };
  //   }
  // }

  getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
