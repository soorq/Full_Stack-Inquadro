import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { HttpLoggerMiddleware } from '@app/shared';
import { ProvidersModule } from '@app/providers';
import { BotModule } from './bot/bot.module';

@Module({
    imports: [ProductModule, ProvidersModule, BotModule]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(HttpLoggerMiddleware).forRoutes('*');
    }
}
