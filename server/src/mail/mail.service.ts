import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';
import { RequestDto } from '@app/shared';

@Injectable()
export class MailService {
    constructor(
        private readonly mailer: MailerService,
        private readonly cfg: ConfigService,
        private event_emit: EventEmitter2
    ) {}

    public sendRequestToMail = async (dto: RequestDto) => {
        await this.event_emit.emitAsync('request.created', dto);
        // await this.mailer.sendMail({});
    };

    public sendCodeToVerify = async (payload: {
        email: string;
        code: string;
    }) => {
        return await this.mailer
            .sendMail({
                to: payload.email,
                from: this.cfg.get('SMTP_USER'),
                subject: 'Подтверждение регистрации',
                template: 'sign',
                context: {
                    code: payload.code
                }
            })
            .catch(e => {
                throw new HttpException(
                    `Ошибка работы почты: ${JSON.stringify(e)}`,
                    HttpStatus.UNPROCESSABLE_ENTITY
                );
            });
    };
}
