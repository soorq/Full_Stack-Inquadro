import { Wizard, Message, WizardStep, Ctx, On, Hears } from 'nestjs-telegraf';
import { ProductService } from 'src/product/product.service';
import { EProduct } from '@app/entities';
import { Scenes } from 'telegraf';

@Wizard('deleteProduct')
export class DeleteProductWizard {
    constructor(private readonly product: ProductService) {}

    @WizardStep(1)
    async onSceneEnter(@Ctx() ctx) {
        await ctx.wizard.next();
        return '✋, отправь мне артикуль для поиска товара';
    }

    @Hears(['CANCEL'])
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
        @Message() msg: { text: string }
    ) {
        const product = await this.product.findByArticul(msg.text);

        if (!product) {
            await ctx.scene.reenter();
            return 'Не верный артикуль, попробуй еще раз';
        }

        ctx.wizard.state['article'] = product.article;
        ctx.wizard.state['id'] = product.id;

        await ctx.reply(`${this.createConfirmationMessage(product)}`, {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '✅ Выйти', callback_data: 'CANCEL' },
                        { text: '❌ Удалить', callback_data: 'NEXT' }
                    ]
                ]
            }
        });

        await ctx.wizard.next();
    }

    @On('callback_query')
    @WizardStep(3)
    async onSelectEdit(@Ctx() ctx) {
        const article = ctx.wizard.state['article'];
        const id = ctx.wizard.state['id'];

        const isNext = ctx.callbackQuery.data === 'NEXT';

        if (isNext) {
            try {
                await this.product.delete(id);
                await ctx.answerCbQuery(
                    `❌ Удален товар с артиклом: ${article}.`,
                    { show_alert: true, cache_time: 60 * 5 }
                );
            } catch (e) {
                await ctx.answerCbQuery(
                    `❌ Произошла ошибка: ${e}. Обратитесь к разработчику для дальнейшего устранения`,
                    { show_alert: true, cache_time: 60 * 5 }
                );
            }

            await ctx.scene.leave();
        }
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
}
