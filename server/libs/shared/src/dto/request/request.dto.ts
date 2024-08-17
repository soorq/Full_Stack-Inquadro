import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: 'varchar',
        title: 'Имя',
        description: 'Имя заказчика',
        default: null,
        required: true
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: 'varchar',
        title: 'Номер телефона',
        description: 'Номер телефона заказчика',
        default: null,
        required: true
    })
    phone: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        type: 'varchar',
        title: 'Почта',
        description: 'Почта заказачика',
        default: null,
        required: true
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: 'varchar',
        title: 'Адрес',
        description: 'Адрес заказчика',
        default: null,
        required: true
    })
    address: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: 'varchar',
        title: 'Город',
        description: 'Город заказчика',
        default: null,
        required: true
    })
    city: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: 'varchar',
        title: 'Подъезд',
        description: 'Подъезд заказчика',
        default: null,
        required: false
    })
    entrance: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: 'varchar',
        title: 'Тип доставки',
        description: 'Тип доставки, который указали в заказе',
        default: null,
        required: true
    })
    shipping_method: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: 'varchar',
        title: 'Тип оплаты, который указали в заказе',
        description: ' в заказе',
        default: null,
        required: true
    })
    payment_method: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: 'varchar',
        title: 'Цена',
        description: 'Цена общая заказа',
        default: null,
        required: true
    })
    price: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: 'varchar',
        title: 'Кол-во пачек',
        description: 'Количество штук в заказе',
        default: null,
        required: true
    })
    pieces: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: 'varchar',
        title: 'Кв. метры',
        description: 'Квадратных метров в заказе',
        default: null,
        required: true
    })
    sqmeters: string;
}
