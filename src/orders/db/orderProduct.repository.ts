import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { OrderProduct } from './orderProduct.entity';

@Injectable()
export class OrderProductRepository extends Repository<OrderProduct> {
  constructor(private dataSource: DataSource) {
    super(OrderProduct, dataSource.createEntityManager());
  }
}
