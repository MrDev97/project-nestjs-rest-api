import { Roles } from '../../shared/enums/roles.enum';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
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
