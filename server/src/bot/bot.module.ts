import { ProductModule } from 'src/product/product.module';
import { telegrafInjectOptions } from '@app/shared';
import { UserModule } from '../user/user.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        TelegrafModule.forRootAsync(telegrafInjectOptions()),
        ProductModule,
        UserModule
    ],
    providers: [BotService, BotUpdate]
})
export class BotModule {}
