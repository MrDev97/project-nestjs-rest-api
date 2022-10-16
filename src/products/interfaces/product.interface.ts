import { Tags } from '../enums/tags.enum';

export class Product {
  id: string;
  name: string;
  price: number;
  count: number;
  tags: Array<Tags>;
  createdAt: Date;
  updatedAt: Date;
}
