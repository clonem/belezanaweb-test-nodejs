import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmptyObject, IsNumber, ValidateNested } from 'class-validator';

import { IInventory } from './../interface/inventory.interface';
import { WarehouseDTO } from './warehouse.dto';

export class InventoryDTO implements IInventory {
  @ApiProperty()
  @Expose()
  @IsNumber()
  quantity?: number;

  @ApiProperty({
    isArray: true,
    type: () => WarehouseDTO,
  })
  @Expose()
  @ValidateNested()
  @IsNotEmptyObject()
  warehouses!: WarehouseDTO[];
}
