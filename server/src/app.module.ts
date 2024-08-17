import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { HttpLoggerMiddleware } from '@app/shared';
import { ProvidersModule } from '@app/providers';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { BotModule } from './bot/bot.module';

@Module({
    imports: [ProductModule, ProvidersModule, BotModule, MailModule, UserModule]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(HttpLoggerMiddleware).forRoutes('*');
    }
}
