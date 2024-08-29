import { AuthApiSign, AuthApiVerify, AuthApiUpdate } from './auth.api';
import { SignDto, VerifyUserDto } from '@app/shared';
import { Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @AuthApiSign()
    async sign(@Body() dto: SignDto) {
        return this.service.signUser(dto);
    }

    @AuthApiVerify()
    async verifyCode(@Body() dto: VerifyUserDto) {
        return this.service.verifyUserCode(dto.email, dto.code);
    }

    @AuthApiUpdate()
    async update(@Body() dto: VerifyUserDto) {
        return this.service.verifyUserCode(dto.email, dto.code);
    }
}
