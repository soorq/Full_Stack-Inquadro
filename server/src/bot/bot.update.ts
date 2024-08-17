import { Action, Command, Ctx, On, Start, Update } from 'nestjs-telegraf';
import { AdminKeyboard } from '@app/shared/telegram';
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

        await ctx.reply(
            'Вы администратор.',
            AdminKeyboard(ctx.session.isAdmin)
        );
    }

    @Action(['cancel', 'back'])
    async onCancelOrBack(@Ctx() ctx) {
        const action = ctx.callbackQuery.data;
        const message =
            action === 'cancel'
                ? 'Отмена редактирования'
                : 'Вы вернулись назад';

        await ctx.answerCbQuery(message);
        await this.service.leaveButton(ctx);
        if (ctx.scene.current) await ctx.scene.leave();
    }

    @Action(['del-admin', 'add-admin'])
    @UseGuards(AdminGuard)
    async onAddAdmin(@Ctx() ctx) {
        const action = ctx.callbackQuery.data;

        const message =
            action === 'add-admin'
                ? 'Вы выбрали добавление админа'
                : 'Вы выбрали удаление админа';

        const sceneName = action === 'add-admin' ? 'addAdmin' : 'delAdmin';

        await ctx.answerCbQuery(message);
        await ctx.scene.enter(sceneName);
    }

    // Универсальный обработчик для редактирования и удаления товара
    @Action(['editProduct', 'deleteProduct'])
    @UseGuards(AdminGuard)
    async onEditOrDeleteProduct(@Ctx() ctx) {
        const action = ctx.callbackQuery.data;
        const message =
            action === 'editProduct'
                ? 'Вы начали редактирование'
                : 'Вы перешли в удаление товара';
        const sceneName =
            action === 'editProduct' ? 'updateProduct' : 'deleteProduct';
        await ctx.answerCbQuery(message);
        await ctx.scene.enter(sceneName);
    }

    @Action('products')
    @UseGuards(AdminGuard)
    async getProducts(@Ctx() ctx) {
        await this.service.getProducts(ctx);
    }

    @Action('table')
    async getInfoTable(@Ctx() ctx) {
        await this.service.sendNotifyAboutTable(ctx);
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
