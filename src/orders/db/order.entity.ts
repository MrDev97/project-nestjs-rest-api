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

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct)
  orderedProducts: OrderProduct[];

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => UserAddress, (address) => address.id, {
    onDelete: 'CASCADE',
  })
  address: UserAddress;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'text' })
  description: string;

  @Column('enum', {
    enum: Statuses,
  })
  status: Statuses;
}
