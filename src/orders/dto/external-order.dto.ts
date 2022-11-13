import {
  IsNumber,
  IsUUID,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsEnum,
  IsArray,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Statuses } from '../enums/statuses.enum';
import { UserAddress } from 'src/users/db/userAddress.entity';
import { User } from 'src/users/db/users.entity';
import { Product } from 'src/products/db/product.entity';

export class ExternalOrderDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ValidateNested({ each: true })
  @Type(() => ExternalOrderProductDto)
  orderedProducts: Array<ExternalOrderProductDto>;

  @IsNotEmpty()
  @IsString()
  user: User;

  @IsNotEmpty()
  @IsString()
  address: UserAddress;

  @IsNotEmpty()
  @IsDate()
  createdAt: Array<number>;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsEnum(Statuses, { each: true })
  @IsArray()
  status: Statuses;
}

export class ExternalOrderProductDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  product: Product;
}
