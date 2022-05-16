import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { IInventory } from './../interface/inventory.interface';
import { CreateWarehouseDTO } from './create-warehouse.dto';

export class CreateInventoryDTO implements IInventory {
  quantity?: number;

  @ApiProperty({
    isArray: true,
    type: () => CreateWarehouseDTO
  })
  @Expose()
  @IsArray()
  @ValidateNested()
  warehouses!: CreateWarehouseDTO[];
}
