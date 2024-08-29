import {
    IsArray,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class ProductOrderDto {
    @IsString()
    @ApiProperty({
        type: 'varchar',
        title: 'Название',
        description: 'Название продукта',
        default: null,
        required: true
    })
    name: string;

    @IsString()
    @ApiProperty({
        type: 'varchar',
        title: 'Категория',
        description: 'Категория продукта',
        default: null,
        required: true
    })
    category: string;

    @IsString()
    @ApiProperty({
        type: 'varchar',
        title: 'Наличие',
        description: 'Наличие продукта',
        default: null,
        required: true
    })
    availability: string;

    @IsString()
    @ApiProperty({
        type: 'varchar',
        title: 'Использование',
        description: 'Использование продукта',
        default: null,
        required: true
    })
    usage: string;

    @IsArray()
    @ApiProperty({
        type: [String],
        title: 'Изображения',
        description: 'Список изображений продукта',
        default: [],
        required: false
    })
    images: string[];

    @IsString()
    @ApiProperty({
        type: 'varchar',
        title: 'Покрытие',
        description: 'Тип покрытия продукта',
        default: null,
        required: true
    })
    plating: string;

    @IsString()
    @ApiProperty({
        type: 'varchar',
        title: 'Текстура',
        description: 'Текстура продукта',
        default: null,
        required: true
    })
    texture: string;

    @IsString()
    @ApiProperty({
        type: 'varchar',
        title: 'Инвойс',
        description: 'Тип инвойса',
        default: null,
        required: true
    })
    invoice: string;

    @IsString()
    @ApiProperty({
        type: 'varchar',
        title: 'Размер',
        description: 'Размер продукта',
        default: null,
        required: true
    })
    size: string;

    @IsString()
    @ApiProperty({
        type: 'varchar',
        title: 'Страна',
        description: 'Страна производства',
        default: null,
        required: true
    })
    country: string;

    @IsNumber()
    @ApiProperty({
        type: 'number',
        title: 'Цена за единицу',
        description: 'Цена за единицу измерения',
        default: null,
        required: true
    })
    price: number;

    @IsString()
    @ApiProperty({
        type: 'varchar',
        title: 'Производство',
        description: 'Тип производства',
        default: null,
        required: true
    })
    manufacturing: string;

    @IsString()
    @ApiProperty({
        type: 'varchar',
        title: 'Комплект',
        description: 'Размер комплекта',
        default: null,
        required: true
    })
    kit: string;

    @IsString()
    @ApiProperty({
        type: 'varchar',
        title: 'Оттенок',
        description: 'Оттенок продукта',
        default: null,
        required: true
    })
    shade: string;

    @IsString()
    @ApiProperty({
        type: 'varchar',
        title: 'Артикул',
        description: 'Артикул продукта',
        default: null,
        required: true
    })
    article: string;

    @IsString()
    @ApiProperty({
        type: 'varchar',
        title: 'Slug',
        description: 'Slug продукта',
        default: null,
        required: true
    })
    slug: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: 'varchar',
        title: 'Тип текстуры',
        description: 'Тип текстуры, если есть',
        default: null,
        required: false
    })
    textureType: string | null;

    @IsNumber()
    @ApiProperty({
        type: 'number',
        title: 'Количество',
        description: 'Количество единиц продукта',
        default: null,
        required: true
    })
    quantity: number;

    @IsNumber()
    @ApiProperty({
        type: 'number',
        title: 'Общая стоимость',
        description: 'Общая стоимость продукта в заказе',
        default: null,
        required: true
    })
    totalPrice: number;
}

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
        description: 'Почта заказчика',
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
    @IsOptional()
    @ApiProperty({
        type: 'varchar',
        title: 'Подъезд',
        description: 'Подъезд заказчика',
        default: null,
        required: false
    })
    entrance?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: 'varchar',
        title: 'Тип доставки',
        description: 'Тип доставки, который указан в заказе',
        default: null,
        required: true
    })
    shipping_method: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: 'varchar',
        title: 'Тип оплаты',
        description: 'Тип оплаты, который указан в заказе',
        default: null,
        required: true
    })
    payment_method: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: 'number',
        title: 'Общая стоимость',
        description: 'Общая стоимость заказа',
        default: null,
        required: true
    })
    price: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: 'number',
        title: 'Общее количество',
        description: 'Общее количество товаров в заказе',
        default: null,
        required: true
    })
    quantity: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductOrderDto)
    @ApiProperty({
        type: [ProductOrderDto],
        title: 'Продукты',
        description: 'Список продуктов в заказе',
        required: true
    })
    products: ProductOrderDto[];
}
