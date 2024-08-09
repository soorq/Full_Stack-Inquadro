import { MailerService } from '@nestjs-modules/mailer';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { RequestDto } from '@app/shared';

@Injectable()
export class MailService {
    constructor(
        private readonly mailer: MailerService,
        private event_emit: EventEmitter2
    ) {}

    public sendRequestToMail = async (dto: RequestDto) => {
        await this.event_emit.emitAsync('request.created', dto);
        // await this.mailer.sendMail({});
    };
}
