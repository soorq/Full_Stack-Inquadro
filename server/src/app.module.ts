import { HttpLoggerMiddleware, UserAgentMiddleware } from '@app/shared';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { ProvidersModule } from '@app/providers';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { BotModule } from './bot/bot.module';
import { OrderModule } from './order/order.module';
import helmet from 'helmet';

@Module({
    imports: [
        ProvidersModule,
        ProductModule,
        MailModule,
        UserModule,
        AuthModule,
        OrderModule,
        BotModule
    ]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(HttpLoggerMiddleware, UserAgentMiddleware, helmet())
            .forRoutes('*');
    }
}
