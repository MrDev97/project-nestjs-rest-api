import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  HttpCode,
  Put,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Order } from './db/order.entity';
import { OrderDataService } from './order-data.service';
import { CreateOrderDto, CreateOrderProductDto } from './dto/create-order.dto';
import {
  ExternalOrderDto,
  ExternalOrderProductDto,
} from './dto/external-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { dateToArray } from 'src/shared/date.helper';
import { OrderProduct } from './db/orderProduct.entity';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrderDataService) {}

  @Get(':id')
  async getOrderById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(await this.orderService.getOrderById(id));
  }

  @Get()
  getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @Post()
  async addOrder(@Body() item: CreateOrderDto): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(await this.orderService.addOrder(item));
  }

  mapOrderToExternal(order: Order): ExternalOrderDto {
    return {
      id: order.id,
      status: order.status,
      totalPrice: order.totalPrice,
      createdAt: dateToArray(order.createdAt),
      address: order.address,
      user: order.user,
      orderedProducts: order.orderedProducts?.map((i) => {
        return this.mapToExternalOrderProduct(i);
      }),
    };
  }

  mapToExternalOrderProduct(
    orderProduct: OrderProduct,
  ): ExternalOrderProductDto {
    return {
      id: orderProduct.id,
      product: orderProduct.product,
      price: orderProduct.price,
      count: orderProduct.count,
    };
  }

  @Delete(':id') @HttpCode(204) deleteOrder(@Param('id') _id_: string): void {
    this.orderService.deleteOrder(_id_);
  }

  @Put(':id')
  async updateOrder(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() order: UpdateOrderDto,
  ): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(
      await this.orderService.updateOrder(id, order),
    );
  }

  @Patch(':id/products')
  async addProductToOrder(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() item: CreateOrderProductDto,
  ): Promise<ExternalOrderProductDto> {
    return this.mapToExternalOrderProduct(
      await this.orderService.addProductToOrder(id, item),
    );
  }

  @Delete(':orderId/products/:idOrderProduct')
  async deleteOrderProduct(
    @Param('orderId', new ParseUUIDPipe({ version: '4' }))
    orderId: string,
    @Param('idOrderProduct', new ParseUUIDPipe({ version: '4' }))
    idOrderProduct: string,
  ): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(
      await this.orderService.deleteOrderProduct(orderId, idOrderProduct),
    );
  }

  @Patch(':orderId/:userAddressId')
  async updateOrderAddress(
    @Param('orderId', new ParseUUIDPipe({ version: '4' })) orderId: string,
    @Body() item: string,
  ): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(
      await this.orderService.updateUserAddress(orderId, item),
    );
  }
}
