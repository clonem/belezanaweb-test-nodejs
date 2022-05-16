import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponseDTO } from './../common/dto/error-response.dto';
import { ProductDTO } from './dto/product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { CreateProductDTO } from './dto/create-product.dto';

@ApiTags('product')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @ApiOperation({
    description: `Criação de produto (exceto as propriedades isMarketable e inventory.quantity)
    <ul>
      <li>Caso um produto já existente em memória tente ser criado com o mesmo sku uma exceção deverá ser lançada
        <ul><li>Dois produtos são considerados iguais se os seus skus forem iguais</ul></li>
      </li>
    </ul>`,
  })
  @ApiCreatedResponse({ type: CreateProductDTO })
  @ApiBadRequestResponse({ type: ErrorResponseDTO })
  @Post()
  create(@Body() createProductDto: CreateProductDTO): ProductDTO {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({ description: 'Listagem de todos os produtos.' })
  @ApiOkResponse({
    type: ProductDTO,
    isArray: true,
  })
  @Get()
  findAll(): ProductDTO[] {
    // TODO: Aplicar paginação caso nescessário
    // REF: https://docs.nestjs.com/openapi/operations#advanced-generic-apiresponse
    return this.productService.findAll();
  }

  @ApiOperation({
    description: `Recuperação de produto por sku.
  <ul>
    <li>Toda vez que um produto for recuperado por sku deverá ser calculado a propriedade: inventory.quantity. 
      <ul><li>A propriedade inventory.quantity é a soma da quantity dos warehouses</li></ul>
    </li>
    <li>Toda vez que um produto for recuperado por sku deverá ser calculado a propriedade: isMarketable. 
      <ul><li>Um produto é marketable sempre que seu inventory.quantity for maior que 0</ul></li>
    </li>
  </ul>`,
  })
  @ApiOkResponse({
    type: ProductDTO,
    isArray: false,
  })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @ApiBadRequestResponse({ type: ErrorResponseDTO })
  @Get(':sku')
  findOne(@Param('sku', ParseIntPipe) sku: number) {
    return this.productService.findOne(sku);
  }

  @ApiOperation({
    description: `Edição de produto por sku
  <ul>
    <li>Ao atualizar um produto, o antigo deve ser sobrescrito com o que esta sendo enviado na requisição
      <ul><li>A requisição deve receber o sku e atualizar com o produto que tbm esta vindo na requisição</ul></li>
    </li>
  </ul>`,
  })
  @ApiOkResponse({ type: ProductDTO })
  @ApiBadRequestResponse({ type: ErrorResponseDTO })
  @Put(':sku')
  update(
    @Param('sku', ParseIntPipe) sku: number,
    @Body() updateProductDto: UpdateProductDTO,
  ): ProductDTO {
    return this.productService.update(sku, updateProductDto);
  }

  @ApiOperation({ description: 'Deleção de produto por sku' })
  @ApiOkResponse({ type: ProductDTO })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @ApiBadRequestResponse({ type: ErrorResponseDTO })
  @Delete(':sku')
  remove(@Param('sku', ParseIntPipe) sku: number) {
    return this.productService.remove(sku);
  }
}
