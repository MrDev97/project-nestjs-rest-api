import { Injectable } from '@nestjs/common';
import { Product } from 'src/products/db/product.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateOrderProductDto } from '../dto/create-order.dto';
import { Order } from './order.entity';
import { OrderProduct } from './orderProduct.entity';

@Injectable()
export class OrderProductRepository extends Repository<OrderProduct> {
  constructor(private dataSource: DataSource) {
    super(OrderProduct, dataSource.createEntityManager());
  }
  public async deleteProductOrderByOrderId(id: string): Promise<void> {
    const orderProducts = await this.find({
      where: {
        id,
      },
    });

    await this.remove(orderProducts);
  }

  public async addProductToOrder(
    id: string,
    item: CreateOrderProductDto,
    product: Product,
  ): Promise<OrderProduct> {
    const orderProduct = new OrderProduct();

    orderProduct.product = new Product();
    orderProduct.count = item.count;
    orderProduct.price = product.price * item.count;
    orderProduct.product.id = product.id;
    orderProduct.product.name = product.name;
    orderProduct.order = new Order();
    orderProduct.order.id = id;

    return await this.save(orderProduct);
  }
}
