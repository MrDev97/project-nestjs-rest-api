import { Controller } from '@nestjs/common';
import { OrdersDataService } from './orders-data.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersDataService) {}
}
