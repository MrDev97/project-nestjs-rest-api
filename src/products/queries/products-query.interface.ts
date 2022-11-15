import { TextFilterType } from 'src/shared/enums/text-filter.enum';

export interface ProductsQuery {
  minPrice?: number;
  maxPrice?: number;
  name?: string;
  nameFilterType?: TextFilterType;
  minCount?: number;
  maxCount?: number;
  sortField?: string;
  orderDirection?: 'DESC' | 'ASC';
}
