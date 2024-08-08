import { ApiProperty } from '@nestjs/swagger';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn
} from 'typeorm';

@Entity('products')
export class EProduct {
    @ApiProperty({
        type: 'string',
        title: 'Уникальный идентификатор',
        description: 'Не путать с артиукулем товара!'
    })
    @PrimaryGeneratedColumn('increment')
    id: string;

    @ApiProperty({
        type: 'string',
        title: 'Категория',
        description: 'Сделана в виде enum'
    })
    @Column({ type: 'varchar' })
    category: string;

    @ApiProperty({
        type: 'string',
        title: 'Название товара'
    })
    @Column({ type: 'varchar' })
    name: string;

    @ApiProperty({
        type: 'enum',
        title: 'Наличие',
        description: 'Сделан в виде enum'
    })
    @Column({ type: 'varchar' })
    availability: string;

    @ApiProperty({
        type: 'string',
        title: 'Применение',
        description: 'Сделан в виде enum'
    })
    @Column({ type: 'varchar' })
    usage: string;

    @ApiProperty({
        type: 'string',
        title: 'Изображение',
        description: 'Вводится вручную'
    })
    @Column()
    image: string;

    @ApiProperty({
        type: 'string',
        title: 'Покрытие',
        description: 'Сделан в виде enum'
    })
    @Column({ type: 'varchar', nullable: true })
    plating: string;

    @ApiProperty({
        type: 'string',
        title: 'Текстура',
        description: 'Сделан в виде enum'
    })
    @Column({ type: 'varchar' })
    texture: string;

    @ApiProperty({
        type: 'string',
        title: 'Фактура',
        description: 'Сделан в виде enum'
    })
    @Column({ type: 'varchar' })
    invoice: string;

    @ApiProperty({
        type: 'string',
        title: 'Размеры',
        description: 'Вводятся вручную'
    })
    @Column()
    size: string;

    @ApiProperty({
        type: 'string',
        title: 'Оттенок',
        description: 'Вводится вручную'
    })
    @Column()
    shade: string;

    @ApiProperty({
        type: 'string',
        title: 'Страна',
        description: 'Или страна производителя'
    })
    @Column()
    country: string;

    @ApiProperty({
        type: 'string',
        title: 'Цена',
        description: 'Вводится вручную цена'
    })
    @Column()
    price: string;

    @ApiProperty({
        type: 'string',
        title: 'Система изготовления',
        description: 'Количество штук в наборе'
    })
    @Column({ type: 'varchar' })
    manufacturing: string;

    @ApiProperty({
        type: 'string',
        title: 'Артикуль',
        description: 'Вот сам товарный артикуль'
    })
    @Column({ type: 'varchar', unique: true })
    article: string;

    @ApiProperty({
        type: 'string',
        title: 'Комплект',
        description: 'Сколько штук в упаковке или сколько поставляется набор'
    })
    @Column()
    kit: string;

    @ApiProperty({
        type: 'string',
        title: 'Дата создания',
        description: 'Автоматически сам высчитывает время'
    })
    @CreateDateColumn()
    createdAt: string;

    @ApiProperty({
        type: 'string',
        title: 'Дата обновления',
        description: 'Автоматические сам высчитывает время'
    })
    @UpdateDateColumn()
    updatedAt: string;
}
