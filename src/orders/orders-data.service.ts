import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class OrdersDataService {
  constructor(private dataSource: DataSource) {}
}
