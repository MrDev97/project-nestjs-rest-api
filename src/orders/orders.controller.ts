import { Controller } from '@nestjs/common';
import { OrderDataService } from './order-data.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrderDataService) {}
}
