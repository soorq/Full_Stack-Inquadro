import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity('orders')
export class EOrder {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({ type: 'varchar' })
    order_id: string;

    @Column({ type: 'varchar', array: true, default: [] })
    products: string[];

    @Column()
    price: number;

    @Column()
    quantity: number;

    @Column()
    area: number;

    @CreateDateColumn()
    createdAt: string;
}
