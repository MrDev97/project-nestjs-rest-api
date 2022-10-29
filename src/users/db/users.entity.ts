import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Roles } from '../../shared/enums/roles.enum';
import { UserAddress } from './userAddress.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 50 })
  email: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column('enum', {
    enum: Roles,
  })
  role: Roles;

  @OneToMany(() => UserAddress, (address) => address.user)
  address?: UserAddress[];
}
