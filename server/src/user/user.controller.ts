import { Body, Controller, Post, Patch, Put } from '@nestjs/common';
import { SignDto, VerifyUserDto } from '@app/shared/dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Post('sign')
    async sign(@Body() dto: SignDto) {
        return this.service.sign(dto);
    }

    @Put('verify')
    async verifyCode(@Body() dto: VerifyUserDto) {
        return this.service.verifyCodeSign(dto.email, dto.code);
    }

    @Patch('update')
    async update(@Body() dto: VerifyUserDto) {
        return this.service.verifyCodeSign(dto.email, dto.code);
    }
}
