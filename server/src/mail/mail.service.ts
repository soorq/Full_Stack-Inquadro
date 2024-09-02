import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserService } from 'src/user/user.service';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class MailService {
    constructor(
        private readonly mailer: MailerService,
        private readonly order: OrderService,
        private readonly cfg: ConfigService,
        private readonly user: UserService,
        private event_emit: EventEmitter2
    ) {}

    public sendRequestToMail = async dto => {
        const user = await this.user.findUserByEmail(dto?.email || '');

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

        const mailOtionsAdmin = {
            to: 'inquadraru@yandex.ru',
            from: this.cfg.get('MAIL_USER'),
            subject: 'Входящий Заказ',
            template: 'admin',
            context: {
                totalQuantity: dto.quantity || 0,
                entrance: dto.entrance || 'Не указано',
                products: dto.products,
                person_name: dto.name,
                total: dto.price,
                address: dto.address,
                city: dto.city,
                payment_method: dto.payment_method,
                user_name: dto.name,
                user_phone: dto.phone,
                user_email: dto.email
            }
        };

        if (user) {
            await this.user.updateUser(user.email, {
                entrance: dto.entrance || '',
                address: dto.address || '',
                phone: dto.phone || '',
                city: dto.city || '',
                name: dto.name || ''
            });
        }

        const isSentToEmailOrder = await new Promise<boolean>(
            async (res, rej) => {
                return await this.mailer
                    .sendMail(mailOtions)
                    .then(() => res(true))
                    .catch(e => {
                        console.log(
                            'Mail Service Error |>>>>>>>>>>|<<<<<<<<<|',
                            e
                        );
                        rej(false);
                    });
            }
        );

        const isSentToEmailAdmin = await new Promise<boolean>(
            async (res, rej) => {
                return await this.mailer
                    .sendMail(mailOtionsAdmin)
                    .then(() => res(true))
                    .catch(e => {
                        console.log(
                            'Mail Service Error |>>>>>>>>>>|<<<<<<<<<|',
                            e
                        );
                        rej(false);
                    });
            }
        );

        if (!isSentToEmailOrder && !isSentToEmailAdmin) {
            throw new HttpException(
                'Произошла непредвиденная ошибка',
                HttpStatus.BAD_REQUEST
            );
        }

        const products = dto.products.map(product => product.article);

        const res = await this.order.createOrder({
            quantity: dto.quantity,
            products: products,
            price: dto.price,
            area: dto.area
        });

        if (!res) {
            throw new HttpException(
                'Простите, произошла ошибка, такой заказ уже существует',
                HttpStatus.CONFLICT
            );
        }

        return res;
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
