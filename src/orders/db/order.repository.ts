import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(private dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  async updateUserAddress(
    orderId: string,
    newAddressId: string,
  ): Promise<Order> {
    await this.update({ id: orderId }, { address: { id: newAddressId } });

    return await this.findOne({ where: { id: orderId } });
  }
}
