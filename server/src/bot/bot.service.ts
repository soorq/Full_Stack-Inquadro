import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Message } from 'telegraf/typings/core/types/typegram';
import { ProductService } from 'src/product/product.service';
import { CreateProductDto } from '@app/shared';
import * as xlsx from 'xlsx';
import axios from 'axios';

@Injectable()
export class BotService {
    constructor(private readonly product: ProductService) {}

    getXLSXTable = async ctx => {
        try {
            const { file_id: fileId } = (ctx.message as Message.DocumentMessage)
                .document;
            const url = await ctx.telegram.getFileLink(fileId);
            const data = await this.downloadFile(url.href);
            const jsonDataExcel = await this.parseExcelData(data);

            await this.saveExcelToDb(jsonDataExcel);
            await ctx.reply('Файл успешно сохранён в БД');
        } catch (error) {
            this.handleError(
                ctx,
                error,
                'Не удалось сохранить файл в БД. Пожалуйста, попробуйте ещё раз.'
            );
        }
    };

    // Метод для сохранения данных Excel в базу данных
    private saveExcelToDb = async (jsonData: any[]): Promise<void> => {
        const existingArticles: string[] = [];
        const failedArticles: string[] = [];

        for (const sheet of jsonData) {
            const [headers, ...rows] = sheet.data;
            for (const row of rows) {
                const productDto = this.mapRowToDto(headers, row);
                try {
                    await this.product.create({
                        ...productDto,
                        price: Math.round(productDto.price)
                    });
                } catch (error) {
                    this.handleProductSaveError(
                        error,
                        productDto.article,
                        existingArticles,
                        failedArticles
                    );
                }
            }
        }

        this.throwIfSaveErrors(existingArticles, failedArticles);
    };

    // Метод для обработки ошибок при сохранении продукта
    private handleProductSaveError(
        error: any,
        article: string,
        existingArticles: string[],
        failedArticles: string[]
    ): void {
        if (
            error instanceof HttpException &&
            error.getStatus() === HttpStatus.CONFLICT
        ) {
            existingArticles.push(article);
        } else {
            Logger.error(
                `Ошибка при сохранении продукта с артикулом ${article}:`,
                error
            );
            failedArticles.push(article);
        }
    }
    private throwIfSaveErrors(
        existingArticles: string[],
        failedArticles: string[]
    ): void {
        // Исправлено условие
        if (existingArticles.length || failedArticles.length) {
            const messages = [];
            if (existingArticles.length) {
                messages.push(
                    `  *Товары с артикулом:* _${existingArticles.join(', ')}_ *уже существуют.*`
                );
            }
            if (failedArticles.length) {
                messages.push(
                    `*Не удалось сохранить товары с артикулом:* _${failedArticles.join(', ')}_.`
                );
            }
            throw new HttpException(
                messages.join('\n\n'),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    private mapRowToDto(headers: string[], row: any[]): CreateProductDto {
        const rowObject = headers.reduce(
            (acc, header, index) => {
                const value = row[index];
                acc[header] = this.sanitizeValue(value);
                return acc;
            },
            {} as Record<string, any>
        );

        return {
            category: rowObject['category'],
            name: rowObject['name'],
            availability: rowObject['availability'],
            usage: rowObject['usage'],
            images: [],
            plating: rowObject['plating'],
            texture: rowObject['texture'],
            invoice: rowObject['invoice'],
            size: rowObject['size'] || 'N/A', // Исправлено на '||'
            shade: rowObject['shade'] || 'N/A', // Исправлено на '||'
            country: rowObject['country'],
            price: rowObject['price'] || '0', // Исправлено на '||'
            manufacturing: rowObject['manufacturing'],
            article: rowObject['article'],
            kit: rowObject['kit'] || '1' // Исправлено на '||'
        };
    }

    private sanitizeValue(value: any): any {
        if (typeof value === 'string') {
            return value.trim() === '' ? null : value.trim();
        }
        return value === undefined ? null : value;
    }

    private parseExcelData = (data: Buffer) => {
        const workbook = xlsx.read(data, { type: 'buffer' });
        return Object.keys(workbook.Sheets).map(sheetName => ({
            data: xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
                defval: '',
                header: 1
            })
        }));
    };

    private downloadFile = async (url: string) => {
        try {
            return (await axios.get(url, { responseType: 'arraybuffer' })).data;
        } catch (error) {
            throw new Error(`Ошибка при скачивании файла: ${error.message}`);
        }
    };

    // Метод для обработки ошибок и отправки сообщений об ошибках
    private handleError(ctx, error, defaultMessage: string) {
        Logger.error('Ошибка:', error);
        ctx.reply(error.message || defaultMessage, { parse_mode: 'Markdown' });
    }
}
