import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { IProduct } from '../interface/product.interface';
import { CreateInventoryDTO } from './create-inventory.dto';

export class CreateProductDTO implements IProduct {
  @ApiProperty()
  @Expose()
  @IsNumber()
  sku!: number;

  @ApiProperty({
    example: `L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g`,
  })
  @Expose()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ type: () => CreateInventoryDTO })
  @Expose()
  @IsNotEmptyObject()
  @ValidateNested()
  inventory!: CreateInventoryDTO;

  isMarketable?: boolean;
}
