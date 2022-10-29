export interface ExternalProductDto {
  productId: string;
  name: string;
  price: number;
  count: number;
  tags: string[];
  createdAt: Array<number>;
  updatedAt: Array<number>;
}
