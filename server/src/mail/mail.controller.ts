import { MailService } from './mail.service';
import { ApiTags } from '@nestjs/swagger';
import {
    InternalServerErrorException,
    Controller,
    Body,
    Post,
    Logger
} from '@nestjs/common';

@ApiTags('Orders')
@Controller('requests')
export class MailController {
    constructor(private readonly service: MailService) {}

    @Post('/')
    async sendRequest(@Body() dto) {
        try {
            return this.service.sendRequestToMail(dto);
        } catch (error) {
            console.log(error);
            Logger.debug(error);
            throw new InternalServerErrorException(
                'Ошибка со стороны сервера',
                error
            );
        }
    }
}
