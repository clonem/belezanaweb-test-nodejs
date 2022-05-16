import { WarehouseTypeEnum } from './../products/enum/warehouse-type.enum';
import { ProductDTO } from './../products/dto/product.dto';

let products: ProductDTO[] = [
  {
    sku: 43264,
    name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
    inventory: {
      quantity: 1,
      warehouses: [
        {
          locality: 'SP',
          quantity: 12,
          type: WarehouseTypeEnum.ecommerce, // 'ECOMMERCE',
        },
        {
          locality: 'MOEMA',
          quantity: 3,
          type: WarehouseTypeEnum.physicalStore, // 'PHYSICAL_STORE',
        },
      ],
    },
    isMarketable: true,
  },
];

export default products;
