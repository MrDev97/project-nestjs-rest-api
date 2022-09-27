import { Roles } from '../enums/roles.enum';

export interface ExternalUserDto {
  id: string;
  name: string;
  surname: string;
  email: string;
  birthday: Array<number>;
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
