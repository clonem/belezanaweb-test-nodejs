import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './../../../src/products/products.service';
import products from './../../../src/data/products.data';

describe('ProductService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = service.findAll();

      expect(result).toBe(products);
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
