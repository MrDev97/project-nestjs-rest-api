import { Product } from 'src/products/db/product.entity';
import { User } from 'src/users/db/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Statuses } from '../enums/statuses.enum';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.productId)
  productList: Product[];

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => User, (user) => user.address)
  @JoinColumn()
  deliveryAddress: User;

  @Column()
  totalAmount: number;

  @Column({ length: 100 })
  additionalInfo: string;

  @Column('enum', {
    enum: Statuses,
  })
  status: Statuses;
}
