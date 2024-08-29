import { Command, Ctx, Start, Update, On } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from '@app/shared';

@Update()
export class BotUpdate {
    constructor(private readonly service: BotService) {}

    @Start()
    async onStart(@Ctx() ctx) {
        const name =
            ctx.message?.from?.id ?? ctx.update.callback_query.from.first_name;
        await ctx.reply(`Добро пожаловать, ${name}!`);
    }

    @Command('admin')
    @UseGuards(AdminGuard)
    async checkAdminStatus(@Ctx() ctx) {
        if (!ctx.session.isAdmin) {
            return 'Попросите, чтоб вас добавили!';
        }

        await ctx.reply('Вы администратор.');
    }

    @On('document')
    @UseGuards(AdminGuard)
    async getXLSXTable(@Ctx() ctx) {
        if (!ctx.session.isAdmin) {
            return 'Нет-нет, голубчик. Тебе сюда нельзя!';
        }
        await this.service.getXLSXTable(ctx);
    }
}
