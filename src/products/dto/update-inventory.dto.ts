import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { IInventory } from './../interface/inventory.interface';
import { UpdateWarehouseDTO } from './update-warehouse.dto';

export class UpdateInventoryDTO implements IInventory {
  quantity?: number;

  @ApiProperty({
    isArray: true,
    type: () => UpdateWarehouseDTO,
    // example: [
    //   {
    //     locality: 'SP',
    //     quantity: 12,
    //     type: 'ECOMMERCE',
    //   },
    //   {
    //     locality: 'MOEMA',
    //     quantity: 3,
    //     type: 'PHYSICAL_STORE',
    //   },
    // ],
  })
  @Expose()
  @IsArray()
  @ValidateNested()
  warehouses!: UpdateWarehouseDTO[];
}
