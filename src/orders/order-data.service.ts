import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/products/db/product.repository';
import { DataSource } from 'typeorm';
import { Order } from './db/order.entity';
import { OrderRepository } from './db/order.repository';
import { OrderProduct } from './db/orderProduct.entity';
import { OrderProductRepository } from './db/orderProduct.repository';
import { CreateOrderDto, CreateOrderProductDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from 'src/users/db/users.entity';
import { UserAddress } from 'src/users/db/userAddress.entity';
import { Statuses } from './enums/statuses.enum';
import dataSource from 'db/data-source';
import { Product } from 'src/products/db/product.entity';

@Injectable()
export class OrderDataService {
  constructor(
    private dataSource: DataSource,
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository,
    private orderProductRepository: OrderProductRepository,
  ) {}

  async addOrder(item: CreateOrderDto): Promise<Order> {
    return await this.dataSource.transaction(async () => {
      const orderToSave = new Order();

      orderToSave.user = new User();
      orderToSave.user.id = item.userId;
      orderToSave.address = new UserAddress();
      orderToSave.address.id = item.addressId;
      orderToSave.orderedProducts = await this.saveOrderProducts(
        item.orderedProducts,
      );
      orderToSave.description = item.description;
      orderToSave.status = Statuses.RECEIVED;
      orderToSave.totalPrice = 0;

      orderToSave.orderedProducts.forEach((element) => {
        orderToSave.totalPrice += element.price;
        return orderToSave.totalPrice;
      });

      return await this.orderRepository.save(orderToSave);
    });
  }

  async deleteOrder(id: string): Promise<void> {
    this.orderRepository.delete(id);
  }

  async deleteOrderProduct(id: string, idOrderProduct: string): Promise<Order> {
    this.orderProductRepository.delete(idOrderProduct);
    return this.getOrderById(id);
  }

  async updateOrder(id: string, item: UpdateOrderDto): Promise<Order> {
    return await this.dataSource.transaction(async () => {
      await this.orderProductRepository.deleteProductOrderByOrderId(id);

      const orderToUpdate = await this.getOrderById(id);

      orderToUpdate.user = new User();
      orderToUpdate.user.id = item.userId;
      orderToUpdate.address = new UserAddress();
      orderToUpdate.address.id = item.addressId;
      orderToUpdate.orderedProducts = await this.saveOrderProducts(
        item.orderedProducts,
      );
      orderToUpdate.description = item.description;
      orderToUpdate.status = item.status;
      orderToUpdate.totalPrice = 0;

      orderToUpdate.orderedProducts.forEach((element) => {
        orderToUpdate.totalPrice += element.price;
        return orderToUpdate.totalPrice;
      });

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

  async addProductToOrder(
    id: string,
    item: CreateOrderProductDto,
  ): Promise<OrderProduct> {
    return await this.dataSource.transaction(async () => {
      const product = await this.productRepository.findOne({
        where: { id: item.productId },
      });

      return await this.orderProductRepository.addProductToOrder(
        id,
        item,
        product,
      );
    });
  }

  async updateUserAddress(id: string, item): Promise<Order> {
    return await this.dataSource.transaction(async () => {
      return await this.orderRepository.updateUserAddress(
        id,
        item.newAddressId,
      );
    });
  }

  async saveOrderProducts(
    productsArray: CreateOrderProductDto[],
  ): Promise<OrderProduct[]> {
    const orderedProducts: OrderProduct[] = [];

    for (let i = 0; i < productsArray.length; i++) {
      const orderedProduct = new OrderProduct();

      const productFromDB = await this.productRepository.findBy({
        id: productsArray[i].productId,
      });

      orderedProduct.product = new Product();
      orderedProduct.count = productsArray[0].count;
      orderedProduct.price = productFromDB[0].price * productsArray[0].count;
      orderedProduct.product.id = productFromDB[0].id;
      orderedProduct.product.name = productFromDB[0].name;

      await dataSource.getRepository(OrderProduct).save(orderedProduct);
      orderedProducts.push(orderedProduct);
    }

    return orderedProducts;
  }
}
