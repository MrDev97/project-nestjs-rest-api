import { Roles } from '../../shared/enums/roles.enum';
import { Transform } from 'class-transformer';
import { arrayToDate } from '../../shared/date.helper';

export class UpdateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  @Transform((d) => arrayToDate(d))
  dateOfBirth: Date;
  address?: Array<UpdateUserAddressDto>;
  role: Roles;
}

export class UpdateUserAddressDto {
  country: string;
  city: string;
  street: string;
  houseNo: number;
  apartmentNo?: number;
}
