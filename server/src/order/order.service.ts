import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EOrder } from '@app/entities';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(EOrder) private readonly db: Repository<EOrder>
    ) {}

    public async createOrder({
        products,
        quantity,
        price,
        area
    }: {
        products: string[];
        quantity: number;
        price: number;
        area: number;
    }) {
        const order_id = this.generateIdOrder(new Date());

        const isOrderExist = await this.findOneByOrderId(order_id);

        if (isOrderExist) {
            throw new HttpException('Уже существует', HttpStatus.CONFLICT);
        }

        const newestOrder = await this.db.create({
            area,
            order_id,
            price,
            products,
            quantity
        });

        return this.db.save(newestOrder);
    }

    public async findLastOrder() {
        return this.db.findOne({
            where: {},
            order: { createdAt: 'DESC' }
        });
    }

    public async findOneByOrderId(id: string) {
        return this.db.findOne({ where: { order_id: id } });
    }

    private generateIdOrder(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const secs = String(date.getSeconds() + 1).padStart(2, '0');

        return `${day}${month}${year}-${secs}`;
    }
}
