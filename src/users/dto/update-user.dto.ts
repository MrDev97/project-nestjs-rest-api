import { Roles } from '../enums/roles.enum';
import { Transform } from 'class-transformer';
import { arrayToDate } from '../../shared/date.helper';

export class UpdateUserDto {
  name: string;
  surname: string;
  email: string;
  @Transform((d) => arrayToDate(d))
  dateOfBirth: Date;
  adress?: Array<UserAddress>;
  role: Roles;
}

export class UserAddress {
  country: string;
  city: string;
  street: string;
  houseNo: string;
  apartmentNo?: string;
}
