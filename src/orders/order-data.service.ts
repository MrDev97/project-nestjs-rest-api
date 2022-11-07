import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Order } from './db/order.entity';
import { OrderRepository } from './db/order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderDataService {
  constructor(
    private dataSource: DataSource,
    private orderRepository: OrderRepository,
  ) {}

  async addOrder(item: CreateOrderDto): Promise<Order> {
    return await this.dataSource.transaction(async () => {
      const orderToSave = new Order();

      return await this.orderRepository.save(orderToSave);
    });
  }

  async deleteOrder(id: string): Promise<void> {
    this.orderRepository.delete(id);
  }

  async updateOrder(id: string, item: UpdateOrderDto): Promise<Order> {
    return await this.dataSource.transaction(async () => {
      const orderToUpdate = await this.getOrderById(id);

      await this.orderRepository.save(orderToUpdate);

      return this.getOrderById(id);
    });
  }

  getOrderById(id: string): Promise<Order> {
    return this.orderRepository.findOne({ where: { id } });
  }

  getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }
}
