import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailController } from './mail.controller';
import { UserModule } from 'src/user/user.module';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { OrderModule } from 'src/order/order.module';

@Module({
    imports: [
        UserModule,
        OrderModule,
        MailerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (cfg: ConfigService) => ({
                transport: {
                    host: cfg.get('SMTP_HOST'),
                    auth: {
                        user: cfg.get('MAIL_USER'),
                        pass: cfg.get('SMTP_PASS')
                    }
                },
                defaults: {
                    from: 'inquadra'
                },
                template: {
                    dir: join(process.cwd(), './static/template'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true
                    }
                }
            })
        })
    ],
    controllers: [MailController],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule {}
