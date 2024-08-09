import { Markup } from 'telegraf';

const createBackButtonKeyboard = () =>
    Markup.inlineKeyboard([Markup.button.callback('⏪ Назад', 'cancel')])
        .reply_markup;

const createUpdateProductKeyboard = () =>
    Markup.inlineKeyboard(
        [
            Markup.button.callback('✏️ Редактировать', 'editProduct'),
            Markup.button.callback('🗑️ Удалить', 'deleteProduct'),
            Markup.button.callback('⏪ Назад', 'back')
        ],
        {
            columns: 2
        }
    ).reply_markup;

export const AdminKeyboard = (isAdmin: boolean) =>
    Markup.inlineKeyboard(
        [
            Markup.button.callback('Товары', 'products', !isAdmin),
            Markup.button.callback('Выгрузить таблицу', 'table', !isAdmin),
            Markup.button.callback('Добавить админа', 'add-admin', !isAdmin),
            Markup.button.callback('Удалить админа', 'del-admin', !isAdmin)
        ],
        {
            columns: 2
        }
    );

export const BreakUpdateButton = createBackButtonKeyboard();

export const BackButton = createBackButtonKeyboard();

export const UpdateProduct = createUpdateProductKeyboard();
