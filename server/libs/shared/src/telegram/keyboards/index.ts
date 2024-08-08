import { Markup } from 'telegraf';

export const KeyboardStart = Markup.inlineKeyboard([
    Markup.button.callback('Товары', 'products'),
    Markup.button.callback('Выгрузить таблицу', 'table')
]).reply_markup;

export const BreakUpdateButton = Markup.inlineKeyboard([
    Markup.button.callback('Назад', 'cancel')
]);

export const BackButton = Markup.inlineKeyboard([
    Markup.button.callback('Назад', 'cancel')
]).reply_markup;

export const UpdateProduct = Markup.inlineKeyboard([
    Markup.button.callback('Редактировать товар', 'editProduct'),
    Markup.button.callback('Назад', 'back')
]).reply_markup;
