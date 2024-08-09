import { ProductService } from './product.service';
import {
    Controller,
    HttpException,
    HttpStatus,
    Param,
    Query
} from '@nestjs/common';
import {
    ApiGetAllProducts,
    ApiGetManyProductsByParams,
    ApiGetOneProductOneById
} from './product.api';

@Controller('product')
export class ProductController {
    constructor(private readonly service: ProductService) {}

    @ApiGetAllProducts()
    getAll() {
        try {
            return this.service.findAll();
        } catch (error) {
            throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiGetManyProductsByParams()
    getByFilter(@Query() query: Record<string, string | number | undefined>) {
        try {
            return this.service.findByFilter(query);
        } catch (error) {
            throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiGetOneProductOneById()
    getById(@Param('id') id: string) {
        try {
            return this.service.findOne(id);
        } catch (error) {
            throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
