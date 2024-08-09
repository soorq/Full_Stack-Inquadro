import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RequestDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    home: string;

    @IsString()
    @IsNotEmpty()
    shipping_method: string;

    @IsString()
    @IsNotEmpty()
    payment_method: string;

    @IsString()
    @IsNotEmpty()
    price: string;

    @IsString()
    @IsNotEmpty()
    pieces: string;

    @IsString()
    @IsNotEmpty()
    sqmeters: string;
}
