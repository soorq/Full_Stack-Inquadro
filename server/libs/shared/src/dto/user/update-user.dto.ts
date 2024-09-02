import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsBoolean()
    isVerifed?: boolean;

    @IsOptional()
    @IsString()
    codeVerified?: string;

    @IsOptional()
    @IsString()
    entrance?: string;
}
