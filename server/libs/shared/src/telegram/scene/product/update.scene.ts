import { Wizard, Message, WizardStep, Ctx, On, Hears } from 'nestjs-telegraf';
import { ProductService } from 'src/product/product.service';
import { EProduct } from '@app/entities';
import { Scenes } from 'telegraf';

@Wizard('updateProduct')
export class UpdateProductWizard {
    constructor(private readonly product: ProductService) {}

    @WizardStep(1)
    async onSceneEnter(@Ctx() ctx) {
        await ctx.reply('✋, отправь мне артикуль для поиска товара');

        await ctx.wizard.next();
    }

    @Hears('CANCEL')
    @On('callback_query')
    async handleCancel(@Ctx() ctx: Scenes.WizardContext) {
        await ctx.answerCbQuery('Вы вышли из редактирования товара.', {
            show_alert: true,
            cache_time: 60 * 5
        });
        await ctx.scene.leave();
    }

    @On('text')
    @WizardStep(2)
    async onArticulSend(
        @Ctx() ctx: Scenes.WizardContext,
        @Message() msg: { text: string; message_id: string }
    ) {
        const product = await this.product.findByArticul(msg.text);

        if (!product) {
            await ctx.wizard.selectStep(2);
            return 'Не верный артикуль, попробуй еще раз';
        }

        await ctx.reply(`${this.createConfirmationMessage(product)}`, {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '✅ Далее', callback_data: 'NEXT' },
                        { text: '❌ Выйти', callback_data: 'CANCEL' }
                    ]
                ]
            }
        });

        ctx.wizard.state['lastUserMessageId'] = msg.message_id;

        ctx.wizard.state['article'] = product.article;
        ctx.wizard.state['id'] = product.id;

        await ctx.wizard.next();
    }

    @On('callback_query')
    @WizardStep(3)
    async onSelectEdit(@Ctx() ctx) {
        const isNextStep = ctx.callbackQuery.data === 'NEXT';

        if (isNextStep) {
            await ctx.answerCbQuery('Вы выбрали продолжить');
            await ctx.reply('🔧 Выберите, что вы хотите редактировать:', {
                reply_markup: {
                    inline_keyboard: this.getEditOptions(),
                    selective: true
                }
            });

            await ctx.wizard.next();
        }
    }

    @On('callback_query')
    @WizardStep(4)
    async onEdit(@Ctx() ctx) {
        const action = ctx.callbackQuery.data;
        const editFields = this.getEditFields();

        if (editFields[action]) {
            await ctx.answerCbQuery();
            ctx.wizard.state['editField'] = editFields[action];
            await ctx.reply(`Введите новое значение для ${editFields[action]}`);

            await ctx.wizard.next();
        }
    }

    @On('text')
    @WizardStep(5)
    async onEditingText(@Ctx() ctx, @Message() msg): Promise<string> {
        ctx.wizard.state['lastUserMessageId'] = msg.message_id;

        const field = ctx.wizard.state['editField'];
        const id = ctx.wizard.state['id'];

        if (!id || !field) {
            await ctx.wizard.selectStep(4);
            return 'Ошибка: отсутствует артикул товара или поле для редактирования.';
        }

        try {
            await this.product.update(id, { [field]: msg.text });
            await ctx.reply(`Значение для ${field} успешно обновлено!`);
        } finally {
        }

        // Возвращаем пользователя к выбору следующего действия или завершению
        await ctx.reply('Выберите следующее действие:', {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: '🔧 Продолжить редактирование',
                            callback_data: 'NEXT'
                        },
                        {
                            text: '❌ Завершить редактирование',
                            callback_data: 'CANCEL'
                        }
                    ]
                ]
            }
        });

        await ctx.wizard.selectStep(3); // Возвращаемся к шагу выбора поля для редактировани
    }

    private createConfirmationMessage(product: EProduct): string {
        return `
📦 *Проверьте, тот ли товар вы выбрали:*
📂 *Категория:* ${product.category}
✅ *Наличие:* ${product.availability}
🌍 *Страна производителя:* ${product.country}
🎨 *Покрытие:* ${product.invoice}
🛠️ *Применение:* ${product.usage}
⚙️ *Покрытие:* ${product.plating || 'Не указано'}
🎨 *Оттенок:* ${product.shade}
📏 *Размеры:* ${product.size}
💵 *Цена:* ${product.price} руб.
📅 *Дата создания:* ${product.createdAt}
🆔 *Артикул:* ${product.article}
`;
    }

    private getEditOptions(): { text: string; callback_data: string }[][] {
        return [
            [
                { text: '📂 Категория', callback_data: 'EDIT_CATEGORY' },
                { text: '✅ Наличие', callback_data: 'EDIT_AVAILABILITY' }
            ],
            [
                {
                    text: '🌍 Страна производителя',
                    callback_data: 'EDIT_COUNTRY'
                },
                { text: '🎨 Покрытие', callback_data: 'EDIT_INVOICE' }
            ],
            [
                { text: '🛠️ Применение', callback_data: 'EDIT_USAGE' },
                { text: '⚙️ Покрытие', callback_data: 'EDIT_PLATING' }
            ],
            [
                { text: '🎨 Оттенок', callback_data: 'EDIT_SHADE' },
                { text: '📏 Размеры', callback_data: 'EDIT_SIZE' },
                { text: '💵 Цена', callback_data: 'EDIT_PRICE' }
            ],
            [
                { text: '❌ Отмена', callback_data: 'CANCEL' } // Кнопка отмены
            ]
        ];
    }

    private getEditFields(): { [key: string]: string } {
        return {
            EDIT_CATEGORY: 'category',
            EDIT_AVAILABILITY: 'availability',
            EDIT_COUNTRY: 'country',
            EDIT_INVOICE: 'invoice',
            EDIT_USAGE: 'usage',
            EDIT_PLATING: 'plating',
            EDIT_SHADE: 'shade',
            EDIT_SIZE: 'size',
            EDIT_PRICE: 'price'
        };
    }
}
