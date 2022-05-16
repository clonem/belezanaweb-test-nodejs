import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { ProductDTO } from './dto/product.dto';
import products from './../data/products.data';
import { IProduct } from './interface/product.interface';
import { UpdateProductDTO } from './dto/update-product.dto';
import { CreateProductDTO } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  onModuleInit() {
    // console.log(`The module ProductsService has been initialized.`);
    // console.log(products);
  }

  public create(createProductDto: CreateProductDTO): ProductDTO {
    // console.log('This action adds a new product');

    // Caso um produto já existente em memória tente ser criado com o mesmo sku uma exceção deverá ser lançada
    // Dois produtos são considerados iguais se os seus skus forem iguais
    const product = products.find(
      (product) => product.sku === createProductDto.sku,
    );

    if (product) {
      throw new BadRequestException(
        'Dois produtos são considerados iguais se os seus skus forem iguais',
      );
    }

    const novoProdutoDTP: ProductDTO = plainToClass(
      ProductDTO,
      createProductDto,
      {
        excludeExtraneousValues: true,
      },
    );

    console.log("transdormado: ", novoProdutoDTP)

    this.quantityCalculation(novoProdutoDTP);

    products.push(novoProdutoDTP);

    return novoProdutoDTP;
  }

  public findAll(): ProductDTO[] {
    // console.log(`This action returns all product`);

    return products;
  }

  public findOne(sku: number): ProductDTO {
    // console.log(`This action returns a #${sku} product`);

    const product = products.find((product) => product.sku === sku);

    if (!product) {
      throw new NotFoundException(`Product #${sku} not found.`);
    }

    // Toda vez que um produto for recuperado por sku deverá:
    //  - ser calculado a propriedade: inventory.quantity. A propriedade inventory.quantity é a soma da quantity dos warehouses
    //  - ser calculado a propriedade: isMarketable. Um produto é marketable sempre que seu inventory.quantity for maior que 0
    // OS CALCULOS SÃO FEITOS SOMENTE NO UPDATE OU CREATE DO PRODUTO, PARA SIMPLIFICAR

    this.quantityCalculation(product);

    return product;
  }

  public update(sku: number, updateProductDto: UpdateProductDTO): ProductDTO {
    // console.log(`This action updates a #${sku} product`);

    const index = products.findIndex((product) => product.sku === sku);

    if (index < 0) {
      throw new NotFoundException(`Product #${sku} not found.`);
    }

    products[index] = {
      ...products[index],
      ...updateProductDto,
    };

    this.quantityCalculation(products[index]);

    return products[index];

    // TODO: falta
    // Toda vez que um produto for recuperado por sku deverá:
    //  - ser calculado a propriedade: inventory.quantity. A propriedade inventory.quantity é a soma da quantity dos warehouses
    //  - ser calculado a propriedade: isMarketable. Um produto é marketable sempre que seu inventory.quantity for maior que 0

    // Ao atualizar um produto, o antigo deve ser sobrescrito com o que esta sendo enviado na requisição
    // A requisição deve receber o sku e atualizar com o produto que tbm esta vindo na requisição
  }

  public remove(sku: number) {
    // console.log(`This action removes a #${sku} product`);

    const index = products.findIndex((product) => product.sku === sku);

    if (index < 0) {
      throw new NotFoundException(`Product #${sku} not found.`);
    }

    products.splice(index, 1);
  }

  private quantityCalculation(product: IProduct) {
    let quantity = 0;

    product.inventory.warehouses?.map((item) => (quantity += item.quantity));
    product.inventory.quantity = quantity;
    product.isMarketable = product.inventory.quantity > 0;
  }
}
