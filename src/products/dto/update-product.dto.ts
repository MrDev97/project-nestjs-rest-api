import { Tags } from '../enums/tags.enum';
import {
  MinLength,
  MaxLength,
  Min,
  IsNumber,
  IsEnum,
  IsArray,
} from 'class-validator';

export class UpdateProductDto {
  @MinLength(1)
  @MaxLength(25)
  name: string;

  @Min(0)
  @IsNumber()
  price: number;

  @Min(0)
  @IsNumber()
  count: number;

  @IsEnum({ each: true })
  @IsArray()
  tags: Array<Tags>;
}
