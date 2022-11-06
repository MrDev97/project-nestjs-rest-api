import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class OrderDataService {
  constructor(private dataSource: DataSource) {}
}
