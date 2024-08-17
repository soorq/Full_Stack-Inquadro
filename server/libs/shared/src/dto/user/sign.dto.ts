import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
