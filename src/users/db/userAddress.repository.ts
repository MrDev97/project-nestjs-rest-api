import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { UserAddress } from './userAddress.entity';

@Injectable()
export class UserAddressRepository extends Repository<UserAddress> {
  constructor(private dataSource: DataSource) {
    super(UserAddress, dataSource.createEntityManager());
  }
}
