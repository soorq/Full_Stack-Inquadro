import { Wizard, Message, Context, WizardStep } from 'nestjs-telegraf';
import { BreakUpdateButton } from '../keyboards';
import { Injectable } from '@nestjs/common';
import type { Scenes } from 'telegraf';

import type {
    Message as TMessage,
    Update
} from 'telegraf/typings/core/types/typegram';
import { ProductService } from 'src/product/product.service';

@Wizard('updateProduct')
@Injectable()
export class UpdateProductWizard {
    constructor(private readonly product: ProductService) {}

    @WizardStep(1)
    async getName(@Context() ctx: Scenes.WizardContext, @Message() text) {
        const product = await this.product.findByArticul('432');

        if (!product)
            await ctx.reply('Такого товара не существует!', {
                reply_markup: BreakUpdateButton.reply_markup
            });

        ctx.reply('Готовы ли продолжить редактирование?', {
            reply_markup: BreakUpdateButton.reply_markup
        });
        ctx.wizard.next();
    }

    @WizardStep(2)
    async getPreview(
        @Context() ctx: Scenes.WizardContext,
        @Message() msg: { text: string }
    ) {
        const product = await this.product.findByArticul(msg.text);

        if (!product)
            await ctx.reply('Такого товара не существует!', {
                reply_markup: BreakUpdateButton.reply_markup
            });

        ctx.reply('Готовы ли продолжить редактирование?', {
            reply_markup: BreakUpdateButton.reply_markup
        });
        ctx.wizard.next();
    }

    @WizardStep(3)
    async getCorrect(
        @Context() ctx: Scenes.WizardContext,
        @Message() msg: { text: string }
    ) {
        ctx.wizard.state['type'] = msg.text;

        const confirmationMessage = `Ваши данные:\n\nНазвание категории: ${ctx.wizard.state['name']}\nТип категории: ${ctx.wizard.state['type']}`;

        (await ctx.reply(confirmationMessage, {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '✅ Все верно', callback_data: 'CORRECT' },
                        { text: '❌ Заполнить заново', callback_data: 'CHANGE' }
                    ]
                ]
            }
        })) as Update.Edited & TMessage.TextMessage;

        ctx.wizard.next();
    }

    @WizardStep(4)
    async getLeave(@Context() ctx: Scenes.WizardContext) {
        // const collection = ctx.wizard.state as { type: string; name: string };
        // await ctx.reply(`Успешно сохранен, ${res.name} - ${res.type}`);
        await ctx.scene.leave();
    }
}
