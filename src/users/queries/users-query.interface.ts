import { TextFilterType } from 'src/shared/enums/text-filter.enum';

export interface UsersQuery {
  firstName?: string;
  lastName?: string;
  email?: string;
  nameFilterType?: TextFilterType;
  dateOfBirth?: string;
  dateOfBirthBefore?: string;
  dateOfBirthAfter?: string;
  role?: string;
  sortField?: string;
  orderDirection?: 'DESC' | 'ASC';
}
