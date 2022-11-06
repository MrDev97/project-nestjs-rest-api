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

export class ExternalOrderDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ValidateNested({ each: true })
  @Type(() => ExternalOrderProductDto)
  orderedProducts: Array<ExternalOrderProductDto>;

  @IsNotEmpty()
  @IsString()
  userFirstName: string;

  @IsNotEmpty()
  @IsString()
  userLastName: string;

  @IsNotEmpty()
  @IsString()
  userEmail: string;

  @IsNotEmpty()
  @IsString()
  userAddress: UserAddress;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

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
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsString()
  productName: string;
}
