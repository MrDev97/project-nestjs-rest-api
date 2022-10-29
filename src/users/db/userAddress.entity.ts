import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './users.entity';

@Entity({
  name: 'user_adresses',
})
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

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

  @ManyToOne(() => User, (user) => user.userId, {
    onDelete: 'CASCADE',
  })
  user: User;
}
