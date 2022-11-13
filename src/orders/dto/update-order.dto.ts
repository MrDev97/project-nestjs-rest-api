import {
  IsNumber,
  IsUUID,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Statuses } from '../enums/statuses.enum';

export class UpdateOrderDto {
  @ValidateNested({ each: true })
  @Type(() => UpdateOrderProductDto)
  orderedProducts: Array<UpdateOrderProductDto>;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  addressId: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsEnum(Statuses, { each: true })
  @IsArray()
  status: Statuses;
}

export class UpdateOrderProductDto {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
