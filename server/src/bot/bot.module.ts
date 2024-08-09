import { ProductModule } from 'src/product/product.module';
import { AdminModule } from 'src/admin/admin.module';
import { telegrafInjectOptions } from '@app/shared';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { Module } from '@nestjs/common';
import {
    DeleteProductWizard,
    UpdateProductWizard,
    DeleteAdminWizard,
    AddAdminWizard
} from '@app/shared';

@Module({
    imports: [
        TelegrafModule.forRootAsync(telegrafInjectOptions()),
        ProductModule,
        AdminModule
    ],
    providers: [
        BotUpdate,
        BotService,
        UpdateProductWizard,
        DeleteProductWizard,
        DeleteAdminWizard,
        AddAdminWizard
    ]
})
export class BotModule {}
