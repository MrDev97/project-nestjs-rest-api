import { Roles } from '../enums/roles.enum';

export interface UpdateUserDto {
  name: string;
  surname: string;
  email: string;
  dateOfBirth: Date;
  adress?: Array<UserAddress>;
  role: Roles;
}

export interface UserAddress {
  country: string;
  city: string;
  street: string;
  houseNo: string;
  apartmentNo?: string;
}
