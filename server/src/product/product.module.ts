import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EProduct } from '@app/entities';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([EProduct])],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})
export class ProductModule {}
