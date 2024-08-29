import { Controller, Get, Param, Query, UploadedFile } from '@nestjs/common';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import {
    ApiGetAllProducts,
    ApiGetManyProductsByParams,
    ApiGetOneProductOneById,
    ApiGetProductsFilter,
    ApiSearchProducts,
    ApiUpdateProductsImages
} from './product.api';

@ApiTags('Products')
@Controller('product')
export class ProductController {
    constructor(private readonly service: ProductService) {}

    @ApiGetAllProducts()
    getAll() {
        return this.service.findAll();
    }

    @ApiGetManyProductsByParams()
    getByFilter(
        @Paginate()
        query: PaginateQuery
    ) {
        return this.service.findByFilter(query);
    }

    @ApiGetOneProductOneById()
    getBySlug(@Param('slug') slug: string) {
        return this.service.findAndMergeBySlug(slug);
    }

    @ApiSearchProducts()
    search(@Query('query') query: string) {
        return this.service.searchProduct(query);
    }

    @ApiGetProductsFilter()
    getCategoriesFilter() {
        return this.service.getCategories();
    }

    @Get('update-images')
    parseLinksToDb () {
        return this.service.parseLinksByArticules();
    }
}
