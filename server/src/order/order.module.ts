import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { Module } from '@nestjs/common';
import { EOrder } from '@app/entities';

@Module({
    imports: [TypeOrmModule.forFeature([EOrder])],
    providers: [OrderService],
    exports: [OrderService]
})
export class OrderModule {}
