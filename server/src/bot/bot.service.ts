import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { CreateProductDto } from '@app/shared';
import * as xlsx from 'xlsx';
import axios from 'axios';
import * as fs from 'fs';

@Injectable()
export class BotService {
    constructor(private readonly product: ProductService) {}

    saveExcelToDb = async (jsonData: any[]): Promise<void> => {
        let hasError = false;
        const existingArticles: string[] = []; // Массив для хранения артикулов, которые уже существуют
        const failedArticles: string[] = []; // Массив для хранения артикулов, которые не удалось сохранить

        for (const sheet of jsonData) {
            const [headers, ...rows] = sheet.data;

            for (const row of rows) {
                const productDto = this.mapRowToDto(headers, row);
                try {
                    await this.product.create(productDto);
                } catch (error) {
                    if (
                        error instanceof HttpException &&
                        error.getStatus() === HttpStatus.CONFLICT
                    ) {
                        existingArticles.push(productDto.article); // Сохраняем артикул, если товар уже существует
                    } else {
                        Logger.error(
                            `Ошибка при сохранении продукта с артикулом ${productDto.article}:`,
                            error
                        );
                        failedArticles.push(productDto.article);
                    }
                    hasError = true;
                }
            }
        }

        if (hasError) {
            const messages = [];
            if (existingArticles.length > 0) {
                messages.push(
                    `*Товары с артикулом:* _${existingArticles.join(', ')}_ *уже существуют.*`
                );
            }
            if (failedArticles.length > 0) {
                messages.push(
                    `*Не удалось сохранить товары с артикулом:* _${failedArticles.join(', ')}_.`
                );
            }
            throw new HttpException(
                messages.join('\n\n'),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    };

    mapRowToDto(headers: string[], row: any[]): CreateProductDto {
        const rowObject: Record<string, any> = headers.reduce(
            (acc, header, index) => {
                const value = row[index];

                if (typeof value === 'string') {
                    acc[header] = value.trim() === '' ? null : value.trim();
                } else {
                    acc[header] = value === undefined ? null : value;
                }

                return acc;
            },
            {} as Record<string, any>
        );

        return {
            category: rowObject['category'],
            name: rowObject['name'],
            availability: rowObject['availability'],
            usage: rowObject['usage'],
            image: rowObject['image'],
            plating: rowObject['plating'],
            texture: rowObject['texture'],
            invoice: rowObject['invoice'],
            size: rowObject['size'] || 'N/A',
            shade: rowObject['shade'] || 'N/A',
            country: rowObject['country'],
            price: rowObject['price'] || '0',
            manufacturing: rowObject['manufacturing'],
            article: rowObject['article'],
            kit: rowObject['kit'] || '1'
        };
    }

    parseExcel = async (filename: string) => {
        const data = await xlsx.readFile(filename);

        return Object.keys(data.Sheets).map(name => ({
            data: xlsx.utils.sheet_to_json(data.Sheets[name], {
                defval: '',
                header: 1
            })
        }));
    };

    async downloadFile(url: string, filePath: string) {
        const writer = fs.createWriteStream(filePath);

        const response = await axios.get(url, { responseType: 'stream' });
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    }

    leaveButton = async ctx => {
        const chatId = ctx.update.callback_query.message?.chat?.id;
        const messageThreadId = ctx.update.callback_query?.message?.message_id;

        await ctx.telegram.deleteMessage(chatId, messageThreadId);
    };
}
