import { IsBoolean, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    name?: string;

    @IsString()
    phone?: string;

    @IsString()
    address?: string;

    @IsString()
    city?: string;

    @IsBoolean()
    isVerifed?: boolean;

    @IsString()
    codeVerified?: string;
}
