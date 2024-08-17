import { Wizard, Message, WizardStep, Ctx, On, Action } from 'nestjs-telegraf';
import { AdminService } from 'src/admin/admin.service';
import { EAdmin } from '@app/entities';
import { Scenes } from 'telegraf';

@Wizard('delAdmin')
export class DeleteAdminWizard {
    constructor(private readonly admin: AdminService) {}

    @WizardStep(1)
    async onSceneEnter(@Ctx() ctx) {
        await ctx.wizard.next();
        await ctx.reply(
            '✋, отправь мне айди сотрудника для удаления из админов',
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Назад', callback_data: 'CANCEL' }]
                    ]
                }
            }
        );
    }

    @Action(['CANCEL'])
    async handleCancel(@Ctx() ctx: Scenes.WizardContext) {
        await ctx.answerCbQuery('Вы вышли из удаления админов.', {
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
        const admin = await this.admin.findOne(msg.text);
        if (!admin) {
            await ctx.scene.reenter();
            return 'Не верный айди, попробуйте еще раз';
        }

        ctx.wizard.state['telegram_id'] = admin.telegram_id;

        await ctx.reply(`${this.createConfirmationMessage(admin)}`, {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '❌ Верно', callback_data: 'NEXT' },
                        { text: '✔️ Отмена', callback_data: 'CANCEL' }
                    ]
                ]
            }
        });

        await ctx.wizard.next();
    }

    @On('callback_query')
    @WizardStep(3)
    async onSelectEdit(@Ctx() ctx) {
        const telegram_id = ctx.wizard.state['telegram_id'];

        try {
            await this.admin.delete(telegram_id);
            await ctx.answerCbQuery(`❌ Удален админ с айди: ${telegram_id}.`, {
                show_alert: true,
                cache_time: 60 * 5
            });
        } catch (e) {
            await ctx.answerCbQuery(
                `❌ Произошла ошибка: ${e}. Обратитесь к разработчику для дальнейшего устранения`,
                { show_alert: true, cache_time: 60 * 5 }
            );
        }

        await ctx.scene.leave();
    }

    private createConfirmationMessage(admin: EAdmin): string {
        return `
📦 *Проверьте, того ли админа выбрали:*
✅ *Активен:* ${admin.isActive}
🆔 *Телеграмм айди:* ${admin.telegram_id}
`;
    }
}
