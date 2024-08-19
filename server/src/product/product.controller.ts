import { Controller, HttpException, Param, Query } from '@nestjs/common';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import {
    ApiGetAllProducts,
    ApiGetManyProductsByParams,
    ApiGetOneProductOneById,
    ApiSearchProducts
} from './product.api';

@ApiTags('Products')
@Controller('product')
export class ProductController {
    constructor(private readonly service: ProductService) {}

    @ApiGetAllProducts()
    getAll() {
        try {
            return this.service.findAll();
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    @ApiGetManyProductsByParams()
    getByFilter(
        @Paginate()
        query: PaginateQuery
    ) {
        try {
            return this.service.findByFilter(query);
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    @ApiGetOneProductOneById()
    getBySlug(@Param('slug') slug: string) {
        try {
            return this.service.findAndMergeBySlug(slug);
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    @ApiSearchProducts()
    search(@Query('query') query: string) {
        return this.service.searchProduct(query);
    }
}
