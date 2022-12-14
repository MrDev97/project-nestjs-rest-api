import { Order } from 'src/orders/db/order.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './users.entity';

@Entity({
  name: 'user_adresses',
})
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  country: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 50 })
  street: string;

  @Column()
  houseNo: number;

  @Column({ default: null })
  apartmentNo?: number;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Order, (order) => order)
  orders?: UserAddress[];
}
