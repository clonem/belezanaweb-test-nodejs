import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { WarehouseTypeEnum } from './../enum/warehouse-type.enum';
import { IWarehouse } from './../interface/warehouses.interface';

export class WarehouseDTO implements IWarehouse {
  @ApiProperty({ example: 'SP' })
  @Expose()
  @IsNotEmpty()
  locality!: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  quantity!: number;

  @ApiProperty({ enum: WarehouseTypeEnum, isArray: false })
  @Expose()
  type!: WarehouseTypeEnum;
}
