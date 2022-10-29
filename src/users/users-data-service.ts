import { Injectable } from '@nestjs/common';
import { User } from './db/users.entity';
import { CreateUserDto, CreateUserAddressDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserAddressDto } from './dto/update-user.dto';
import { UserAddress } from './db/userAddress.entity';
import { UserRepository } from './db/users.repository';
import { UserAddressRepository } from './db/userAddress.repository';

@Injectable()
export class UsersDataService {
  constructor(
    private userRepository: UserRepository,
    private userAddressRepository: UserAddressRepository,
  ) {}

  async addUser(_user_: CreateUserDto): Promise<User> {
    const address: UserAddress[] = await this.prepareUserAddressesToSave(
      _user_.address,
    );
    const userToSave = new User();

    userToSave.firstName = _user_.firstName;
    userToSave.lastName = _user_.lastName;
    userToSave.email = _user_.email;
    userToSave.dateOfBirth = _user_.dateOfBirth;
    userToSave.role = _user_.role;
    userToSave.address = address;

    return await this.userRepository.save(userToSave);
  }

  async prepareUserAddressesToSave(
    address: CreateUserAddressDto[] | UpdateUserAddressDto[],
  ): Promise<UserAddress[]> {
    const addresses: UserAddress[] = [];
    for (const add of address) {
      const addressToSave = new UserAddress();

      addressToSave.country = add.country;
      addressToSave.city = add.city;
      addressToSave.street = add.street;
      addressToSave.houseNo = add.houseNo;
      addressToSave.apartmentNo = add.apartmentNo;

      addresses.push(await this.userAddressRepository.save(addressToSave));
    }

    return addresses;
  }

  async deleteUser(userId: string): Promise<void> {
    this.userRepository.delete(userId);
  }

  async updateUser(userId: string, _user_: UpdateUserDto): Promise<User> {
    await this.userAddressRepository.deleteUserAddressesByUserId(userId);
    const address: UserAddress[] = await this.prepareUserAddressesToSave(
      _user_.address,
    );
    const userToUpdate = await this.getUserById(userId);

    console.log(userToUpdate);

    userToUpdate.firstName = _user_.firstName;
    userToUpdate.lastName = _user_.lastName;
    userToUpdate.email = _user_.email;
    userToUpdate.dateOfBirth = _user_.dateOfBirth;
    userToUpdate.role = _user_.role;
    userToUpdate.address = address;

    return await this.userRepository.save(userToUpdate);
  }

  getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  getUserById(userId: string): Promise<User> {
    return this.userRepository.findOne({ where: { userId } });
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
