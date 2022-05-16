import { IInventory } from './inventory.interface';

export interface IProduct {
  sku?: number;
  name: string;
  inventory: IInventory;
  isMarketable?: boolean;
}
