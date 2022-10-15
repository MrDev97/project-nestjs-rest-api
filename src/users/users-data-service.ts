import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersDataService {
  private users: Array<User> = [];

  addUser(newUser: CreateUserDto): User {
    const savedUser = {
      ...newUser,
      id: uuidv4(),
    };

    this.users.push(savedUser);
    return savedUser;
  }

  deleteUser(id: string): void {
    this.users.filter((i) => i.id === id);
  }

  updateUser(id: string, dto: UpdateUserDto): User {
    const user = this.getUserById(id);

    if (user) {
      return {
        ...user,
        ...dto,
        id: user.id,
      };
    }
  }

  getUserByEmail(email: string): User {
    return this.users.find((i) => i.email === email);
  }

  getUserById(id: string): User {
    return this.users.find((i) => i.id === id);
  }

  getAllUsers(): Array<User> {
    return this.users;
  }
}
