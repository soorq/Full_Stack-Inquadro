import { MailService } from './mail.service';
import { RequestDto } from '@app/shared';
import {
    InternalServerErrorException,
    Controller,
    Body,
    Post
} from '@nestjs/common';

@Controller('requests')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Post()
    async sendRequest(@Body() dto: RequestDto) {
        try {
            return this.mailService.sendRequestToMail(dto);
        } catch (error) {
            throw new InternalServerErrorException(
                'Ошибка со стороны сервера',
                error
            );
        }
    }
}
