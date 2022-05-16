import { IWarehouse } from './warehouses.interface';

export interface IInventory {
  quantity?: number;
  warehouses: IWarehouse[];
}
