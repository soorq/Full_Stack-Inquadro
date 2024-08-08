import { Controller, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import {
    ApiGetAllProducts,
    ApiGetManyProductsByPagination,
    ApiGetOneProductOneById
} from './product.api';

@Controller()
export class ProductController {
    constructor(private readonly service: ProductService) {}

    @ApiGetAllProducts()
    getAll() {
        return this.service.findAll();
    }

    @ApiGetManyProductsByPagination()
    getByFilter(@Query() category: string) {
        return this.service.findByFilter({ heelo: '' });
    }

    @ApiGetOneProductOneById()
    getById(@Param() id: string) {
        return this.service.findOne(id);
    }
}
