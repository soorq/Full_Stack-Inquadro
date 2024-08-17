import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyUserDto {
    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}
