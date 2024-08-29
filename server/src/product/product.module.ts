import { ProductController } from './product.controller';
import { YCloudModule } from '../y-cloud/y-cloud.module';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExcelService } from '@app/shared';
import { EProduct } from '@app/entities';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([EProduct]), YCloudModule],
    controllers: [ProductController],
    providers: [ProductService, ExcelService],
    exports: [ProductService]
})
export class ProductModule {}
