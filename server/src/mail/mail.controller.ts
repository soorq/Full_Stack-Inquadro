import { MailService } from './mail.service';
import { RequestDto } from '@app/shared';
import {
    InternalServerErrorException,
    Controller,
    Body,
    Post
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('requests')
export class MailController {
    constructor(private readonly service: MailService) {}

    @Post('/')
    async sendRequest(@Body() dto: RequestDto) {
        try {
            return dto;
            // return this.service.sendRequestToMail(dto);
        } catch (error) {
            throw new InternalServerErrorException(
                'Ошибка со стороны сервера',
                error
            );
        }
    }

    @OnEvent('user.created', { async: true })
    async sendCodeToEmail(payload: { email: string; code: string }) {
        return this.service.sendCodeToVerify(payload);
    }
}
