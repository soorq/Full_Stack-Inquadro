import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Message } from 'telegraf/typings/core/types/typegram';
import { ProductService } from 'src/product/product.service';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateProductDto } from '@app/shared';
import * as xlsx from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';
import axios from 'axios';

@Injectable()
export class BotService {
    constructor(private readonly product: ProductService) {}

    @OnEvent('request.created')
    private async onRequestCreated(payload) {
        console.log(payload);
    }

    getXLSXTable = async ctx => {
        try {
            const { file_id: fileId } = (ctx.message as Message.DocumentMessage)
                .document;
            const { first_name: userFirstName, id: userId } =
                ctx.update?.message?.from;
            const url = await ctx.telegram.getFileLink(fileId);
            const filePath = this.generateFilePath(userId, userFirstName);

            await this.downloadFile(url.href, filePath);
            const jsonDataExcel = await this.parseExcel(filePath);
            console.log(jsonDataExcel);
            fs.unlinkSync(filePath);

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

    // Метод для генерации пути к файлу
    private generateFilePath(userId: string, userFirstName: string): string {
        return path.join(
            process.cwd(),
            `/static/documents/by-${userId}-${userFirstName}.xlsx`
        );
    }

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

    // Метод для выброса ошибки с сообщением о неудачах при сохранении
    private throwIfSaveErrors(
        existingArticles: string[],
        failedArticles: string[]
    ): void {
        if (existingArticles.length || failedArticles.length) {
            const messages = [];
            if (existingArticles.length) {
                messages.push(
                    `*Товары с артикулом:* _${existingArticles.join(', ')}_ *уже существуют.*`
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

    // Метод для преобразования строки Excel в DTO
    private mapRowToDto(headers: string[], row: any[]): CreateProductDto {
        const rowObject = headers.reduce(
            (acc, header, index) => {
                const value = row[index];
                acc[header] = this.sanitizeValue(value);
                return acc;
            },
            {} as Record<string, any>
        );

        console.log(
            rowObject['category'],
            rowObject['name'],
            rowObject['availability'],
            rowObject['usage'],
            [],
            rowObject['plating'],
            rowObject['texture'],
            rowObject['invoice'],
            rowObject['size'] || 'N/A',
            rowObject['shade'] || 'N/A',
            rowObject['country'],
            rowObject['price'] || '0',
            rowObject['manufacturing'],
            rowObject['article'],
            rowObject['kit'] || '1'
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
            size: rowObject['size'] || 'N/A',
            shade: rowObject['shade'] || 'N/A',
            country: rowObject['country'],
            price: rowObject['price'] || '0',
            manufacturing: rowObject['manufacturing'],
            article: rowObject['article'],
            kit: rowObject['kit'] || '1'
        };
    }

    // Метод для очистки значения
    private sanitizeValue(value: any): any {
        if (typeof value === 'string') {
            return value.trim() === '' ? null : value.trim();
        }
        return value === undefined ? null : value;
    }

    // Метод для разбора Excel-файла
    private parseExcel = async (filename: string) => {
        const data = xlsx.readFile(filename);
        return Object.keys(data.Sheets).map(name => ({
            data: xlsx.utils.sheet_to_json(data.Sheets[name], {
                defval: '',
                header: 1
            })
        }));
    };

    // Метод для скачивания файла
    private downloadFile = async (url: string, filePath: string) => {
        const writer = fs.createWriteStream(filePath);
        const response = await axios.get(url, { responseType: 'stream' });
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    };

    // Метод для обработки ошибок и отправки сообщений об ошибках
    private handleError(ctx, error, defaultMessage: string) {
        Logger.error('Ошибка:', error);
        ctx.reply(error.message || defaultMessage, { parse_mode: 'Markdown' });
    }
}
