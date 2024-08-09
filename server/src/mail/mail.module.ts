import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailController } from './mail.controller';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { Module } from '@nestjs/common';
import { join } from 'path';

@Module({
    imports: [
        MailerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: () => ({
                transport: {
                    host: 'smtp.mail.ru',
                    auth: {
                        user: 'soorqprod@mail.ru',
                        pass: 'p9Mua3KTvwK5HABtXySK'
                    }
                },
                defaults: {
                    from: 'soorqProdServer'
                },
                template: {
                    dir: join(__dirname, './templates'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true
                    }
                }
            })
        })
    ],

    controllers: [MailController],
    providers: [MailService]
})
export class MailModule {}
