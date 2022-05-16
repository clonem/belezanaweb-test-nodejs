import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject, ValidateNested } from 'class-validator';

import { IProduct } from './../interface/product.interface';
import { UpdateInventoryDTO } from './update-inventory.dto';

export class UpdateProductDTO implements IProduct {
  sku?: number;

  @ApiProperty({
    example: `L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g`,
  })
  @Expose()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ type: () => UpdateInventoryDTO })
  @Expose()
  @IsNotEmptyObject()
  @ValidateNested()
  inventory!: UpdateInventoryDTO;

  isMarketable?: boolean;
}
