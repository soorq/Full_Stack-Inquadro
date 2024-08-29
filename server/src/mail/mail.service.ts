import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
// import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class MailService {
    constructor(
        private readonly mailer: MailerService,
        private readonly cfg: ConfigService
        // private event_emit: EventEmitter2
    ) {}

    public sendRequestToMail = async dto => {
        const mailOtions = {
            to: dto.email,
            from: this.cfg.get('MAIL_USER'),
            subject: 'Подтверждение регистрации',
            template: 'order',
            context: {
                totalQuantity: dto.quantity || 0,
                entrance: dto.entrance || 'Не указано',
                products: dto.products,
                person_name: dto.name,
                total: dto.price,
                address: dto.address,
                city: dto.city,
                payment_method: dto.payment_method
            }
        };

        return await new Promise<boolean>(async (res, rej) => {
            return await this.mailer
                .sendMail(mailOtions)
                .then(() => res(true))
                .catch(e => {
                    console.log('Mail Service Error |>>>>>>>>>>|<<<<<<<<<|', e);
                    rej(false);
                });
        });
    };

    public sendCodeToVerify = async (payload: {
        email: string;
        code: string;
    }) => {
        const mailOtions = {
            to: payload.email,
            from: this.cfg.get('MAIL_USER'),
            subject: 'Подтверждение регистрации',
            template: 'sign',
            context: {
                code: payload.code
            }
        };

        return await new Promise<boolean>(async (res, rej) => {
            return await this.mailer
                .sendMail(mailOtions)
                .then(() => res(true))
                .catch(e => {
                    console.log('Mail Service Error |>>>>>>>>>>|<<<<<<<<<|', e);
                    rej(false);
                });
        });
    };
}
