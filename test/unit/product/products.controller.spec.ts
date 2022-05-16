import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { ProductsController } from './../../../src/products/products.controller';
import { ProductsService } from './../../../src/products/products.service';
import products from './../../../src/data/products.data';
import { CreateProductDTO } from './../../../src/products/dto/create-product.dto';

describe('ProductController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    service = moduleRef.get<ProductsService>(ProductsService);
    controller = moduleRef.get<ProductsController>(ProductsController);
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(() => products);

      expect(controller.findAll()).toBe(products);
    });
  });

  describe('findOne', () => {
    it('should return one products', async () => {
      const result = products[0];
      jest.spyOn(service, 'findOne').mockImplementation(() => result);

      expect(controller.findOne(123)).toBe(result);

      expect(service.findOne).toBeCalledTimes(1);
    });

    it('should return NotFoundException', async () => {
      jest.spyOn(service, 'findOne').mockImplementation((sku: number) => {
        throw new NotFoundException(`Product #${sku} not found.`);
      });

      try {
        controller.findOne(123);
      } catch (e) {
        expect(e).toHaveProperty('message', 'Product #123 not found.');
      }
    });
  });

  describe('create', () => {
    it('should create one products', async () => {
      const result = products[0];
      jest.spyOn(service, 'create').mockImplementation(() => result);

      expect(controller.create(result)).toBe(result);

      expect(service.create).toBeCalledTimes(1);
    });

    it('should return duplicated SKU error', async () => {
      jest
        .spyOn(service, 'create')
        .mockImplementation((createProductDto: CreateProductDTO) => {
          throw new BadRequestException(
            'Dois produtos são considerados iguais se os seus skus forem iguais',
          );
        });

      try {
        controller.create(products[0]);
      } catch (e) {
        expect(e).toHaveProperty(
          'message',
          'Dois produtos são considerados iguais se os seus skus forem iguais',
        );
      }
    });
  });

  describe('update', () => {
    it('should update one products', async () => {
      const result = products[0];
      jest.spyOn(service, 'update').mockImplementation(() => result);

      expect(controller.update(123, result)).toBe(result);

      expect(service.update).toBeCalledTimes(1);
    });

    it('should return NotFoundException', async () => {
      jest.spyOn(service, 'update').mockImplementation((sku: number) => {
        throw new NotFoundException(`Product #${sku} not found.`);
      });

      try {
        controller.update(123, products[0]);
      } catch (e) {
        expect(e).toHaveProperty('message', 'Product #123 not found.');
      }
    });
  });

  describe('remove', () => {
    it('should remove one products', async () => {
      jest.spyOn(service, 'remove').mockImplementation();

      expect(controller.remove(123)).toBeNull;

      expect(service.remove).toBeCalledTimes(1);
    });

    it('should return NotFoundException', async () => {
      jest.spyOn(service, 'remove').mockImplementation((sku: number) => {
        throw new NotFoundException(`Product #${sku} not found.`);
      });

      try {
        controller.remove(123);
      } catch (e) {
        expect(e).toHaveProperty('message', 'Product #123 not found.');
      }
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
