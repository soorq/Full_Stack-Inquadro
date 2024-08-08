import { BotService } from './bot.service';
import { Module } from '@nestjs/common';
import { BotUpdate } from './bot.update';
import { TelegrafModule } from 'nestjs-telegraf';
import { telegrafInjectOptions } from '@app/shared/config/telegraf.config';
import { ProductModule } from 'src/product/product.module';

@Module({
    imports: [
        TelegrafModule.forRootAsync(telegrafInjectOptions()),
        ProductModule
    ],
    providers: [BotUpdate, BotService]
})
export class BotModule {}
