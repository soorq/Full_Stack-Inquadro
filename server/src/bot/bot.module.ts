import { ProductModule } from 'src/product/product.module';
import { UserModule } from '../user/user.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TelegrafModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (cfg: ConfigService) => ({
                token: cfg.get('TELEGRAM_API')
            })
        }),
        ProductModule,
        UserModule
    ],
    providers: [BotService, BotUpdate]
})
export class BotModule {}
