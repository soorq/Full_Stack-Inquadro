import { Action, Ctx, InjectBot, On, Start, Update } from 'nestjs-telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import { ProductService } from 'src/product/product.service';
import { Context, Scenes, Telegraf } from 'telegraf';
import { BotService } from './bot.service';
import { Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import {
    BackButton,
    BreakUpdateButton,
    KeyboardStart,
    UpdateProduct
} from '@app/shared/telegram';

@Update()
export class BotUpdate {
    constructor(
        @InjectBot()
        private readonly bot: Telegraf<Context>,
        private readonly service: BotService,
        private readonly product: ProductService
    ) {}

    @Start()
    async onStart(@Ctx() ctx) {
        const name =
            ctx.message?.from?.first_name ??
            ctx.update.callback_query.from.first_name;

        await ctx.reply(`Добро пожаловать, ${name}!`, {
            reply_markup: KeyboardStart
        });
    }

    @Action('cancel')
    async getBack(ctx: Scenes.WizardContext) {
        await ctx.answerCbQuery('Отмена редактирования');

        if (!ctx?.scene) await ctx.scene?.leave;

        await this.service.leaveButton(ctx);
    }

    @Action('editProduct')
    async updateProduct(@Ctx() ctx: Scenes.SceneContext) {
        ctx.answerCbQuery('Вы начали редактирование', {
            show_alert: true,
            cache_time: 500
        });

        await this.service.leaveButton(ctx);

        ctx.reply(
            'Введите последние артикуль товара, которого желаете редактировать',
            {
                reply_markup: BreakUpdateButton.reply_markup
            }
        );

        ctx.scene.enter('updateProduct');
    }

    @Action('back')
    async backFunction(@Ctx() ctx: Context) {
        ctx.answerCbQuery('Вы вернулись назад', {
            show_alert: true,
            cache_time: 500
        });

        await this.service.leaveButton(ctx);
    }

    @Action('products')
    async getProducts(@Ctx() ctx: Context) {
        ctx.answerCbQuery('Отлично, товары отобразятся ниже');
        const products = await this.product.findAll();

        const message = [];

        products.map(product =>
            message.push(
                `🔗 Артикуль: ${product.article} 📦 Наличие: ${product.availability}`
            )
        );

        await ctx.reply(`${message}`, { reply_markup: UpdateProduct });
    }

    @Action('table')
    async getInfoTable(@Ctx() ctx: Context) {
        ctx.answerCbQuery('Теперь следуйте шагам ниже!');
        await ctx.reply(
            'Чтобы загрузить файл с товаром в базу данных, проделайте эти шаги: \n\n<b>1. Нажмите на скрепку около поля ввода.</b> \n<b>2. Выберите файл в формате .xlsx*.</b> \n<b>3. Нажмите на него и он начнет загружаться - вам бот отправит результат загрузки.</b> \n\n* Заметка, что бот работает только с файлами из excel и загрузка происходит исключительно из него.',
            { parse_mode: 'HTML', reply_markup: BackButton }
        );
    }

    @On('document')
    async getXLSXTable(@Ctx() ctx) {
        const fileId = (ctx.message as Message.DocumentMessage).document
            .file_id;
        const userFirstName = ctx.update?.message?.from?.first_name;
        const userId = ctx.update?.message?.from?.id;
        const url = await ctx.telegram.getFileLink(fileId);
        const filePath = path.join(
            process.cwd(),
            `documents/by-${userId}-${userFirstName}.xlsx`
        );
        await this.service.downloadFile(url.href, filePath);
        const jsonDataExcel = await this.service.parseExcel(filePath);
        fs.unlinkSync(filePath);

        try {
            await this.service.saveExcelToDb(jsonDataExcel);
            await ctx.reply('Файл успешно сохранён в БД');
        } catch (error) {
            Logger.error('Ошибка при сохранении файла в БД:', error);
            await ctx.reply(
                error.message ||
                    'Не удалось сохранить файл в БД. Пожалуйста, попробуйте ещё раз.',
                {
                    parse_mode: 'Markdown'
                }
            );
        }
    }
}
