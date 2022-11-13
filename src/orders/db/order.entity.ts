import { UserAddress } from 'src/users/db/userAddress.entity';
import { User } from 'src/users/db/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Statuses } from '../enums/statuses.enum';
import { OrderProduct } from './orderProduct.entity';

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

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    eager: true,
  })
  orderedProducts: OrderProduct[];

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user: User;

  @ManyToOne(() => UserAddress, (address) => address.id, {
    onDelete: 'CASCADE',
    eager: true,
  })
  address: UserAddress;

  @Column({ type: 'float' })
  totalPrice: number;

  @Column({ type: 'text' })
  description: string;

  @Column('enum', {
    enum: Statuses,
  })
  status: Statuses;
}
