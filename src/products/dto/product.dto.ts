import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
} from 'class-validator';

import { IProduct } from './../interface/product.interface';
import { InventoryDTO } from './inventory.dto';

export class ProductDTO implements IProduct {
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

  @ApiProperty({ type: () => InventoryDTO })
  @Expose()
  @IsNotEmptyObject()
  inventory!: InventoryDTO;

  @ApiProperty()
  @Expose()
  @IsBoolean()
  @IsNotEmpty()
  isMarketable!: boolean;
}
