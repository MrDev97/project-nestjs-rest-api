import { Roles } from '../../shared/enums/roles.enum';

export class ExternalUserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Array<number>;
  address?: Array<ExternalUserAddress>;
  role: Roles;
}

export class ExternalUserAddress {
  country: string;
  city: string;
  street: string;
  houseNo: number;
  apartmentNo?: number;
}
