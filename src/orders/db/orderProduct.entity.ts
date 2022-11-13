import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Product } from 'src/products/db/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Order } from './order.entity';

@Entity({
  name: 'order_products',
})
export class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'float' })
  price: number;

  @Column()
  amount: number;

  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsString()
  productName: string;

  @ManyToOne(() => Product, (product) => product.id, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => Order, (order) => order.id, {
    onDelete: 'CASCADE',
  })
  order: Order;
}
