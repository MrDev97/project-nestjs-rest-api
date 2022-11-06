import { Product } from 'src/products/db/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
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

  @ManyToOne(() => Product, (product) => product, {
    onDelete: 'CASCADE',
  })
  productData: Product;

  @OneToOne(() => Order)
  @JoinColumn()
  orderId: Order;
}
