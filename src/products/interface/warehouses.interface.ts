import { WarehouseTypeEnum } from './../enum/warehouse-type.enum';

export interface IWarehouse {
  locality: string;
  quantity: number;
  type: WarehouseTypeEnum;
}
