import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  HttpCode,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Order } from './db/order.entity';
import { OrderDataService } from './order-data.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ExternalOrderDto } from './dto/external-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { dateToArray } from 'src/shared/date.helper';

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
      price: order.price,
      address: order.address,
      user: order.user,
      orderedProducts: order.orderedProducts?.map((i) => {
        return {
          id: i.id,
          product: i.product,
          price: i.price,
          amount: i.amount,
        };
      }),
      createdAt: dateToArray(order.createdAt),
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
}
