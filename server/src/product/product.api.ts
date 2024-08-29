import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { EProduct } from '@app/entities';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiConsumes,
    ApiOkResponse,
    ApiOperation,
    ApiQuery
} from '@nestjs/swagger';
import {
    applyDecorators,
    Get,
    HttpStatus,
    Patch,
    Post,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

export const ApiGetAllProducts = () =>
    applyDecorators(
        ApiOperation({
            summary: 'Получение всех статьей, всех юзеров',
            description: 'Идет обращение в бд для сбора всех постов'
        }),
        ApiOkResponse({
            status: HttpStatus.OK,
            type: EProduct,
            isArray: true
        }),
        ApiBadRequestResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Плохой запроос или не найдены данные'
        }),
        UseInterceptors(CacheInterceptor),
        CacheKey('Products'),
        CacheTTL(60 * 5),
        Get('all')
    );

export const ApiGetOneProductOneById = () =>
    applyDecorators(
        ApiOperation({
            summary: 'Получение по уникальному значению',
            description: 'Получение одного поста по айди'
        }),
        ApiOkResponse({
            status: HttpStatus.OK,
            type: EProduct,
            isArray: true
        }),
        ApiBadRequestResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Плохой запроос или айди не найден'
        }),
        UseInterceptors(CacheInterceptor),
        CacheTTL(60 * 5),
        Get('get/:slug')
    );

export const ApiSearchProducts = () =>
    applyDecorators(
        ApiOperation({
            summary: 'Получение отсортированных по поиску',
            description: 'Для получения по поиску сортированных продукрты'
        }),
        ApiOkResponse({
            status: HttpStatus.OK,
            type: EProduct,
            description: 'Отдает найденые продукрты по бд'
        }),
        ApiBadRequestResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Плохой запроос или не найдены данные'
        }),
        UseInterceptors(CacheInterceptor),
        CacheTTL(60 * 3),
        Get('search?')
    );

export const ApiGetManyProductsByParams = () =>
    applyDecorators(
        ApiOperation({
            summary: 'Получение продуктов по фильтрам',
            description: 'Возвращает список продуктов на основе фильтров'
        }),
        ApiOkResponse({
            status: HttpStatus.OK,
            isArray: true,
            description: 'Список отфильтрованных продуктов',
            type: EProduct
        }),
        ApiBadRequestResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Неправильный запрос или данные не найдены'
        }),
        ApiQuery({ type: 'string', required: false, name: 'category' }),
        ApiQuery({ type: 'string', required: false, name: 'usage' }),
        ApiQuery({ type: 'string', required: false, name: 'availability' }),
        ApiQuery({ type: 'string', required: false, name: 'plating' }),
        ApiQuery({ type: 'string', required: false, name: 'size' }),
        ApiQuery({ type: 'string', required: false, name: 'texture' }),
        ApiQuery({ type: 'string', required: false, name: 'minPrice' }),
        ApiQuery({ type: 'string', required: false, name: 'maxPrice' }),
        ApiQuery({
            type: 'number',
            required: false,
            name: 'limit',
            example: 20
        }),
        ApiQuery({
            type: 'number',
            required: false,
            name: 'offset',
            example: 0
        }),
        UseInterceptors(CacheInterceptor),
        CacheTTL(60 * 5), // Кэшируем на 5 минут
        Get('filter')
    );

export const ApiUpdateProductsImages = () =>
    applyDecorators(
        ApiOperation({
            summary: 'Загрузка в бд изображений и клауд',
            description: 'Возвращает список продуктов на основе фильтров'
        }),
        ApiConsumes('multipart/form-data'),
        ApiBody({
            schema: {
                type: 'object',
                properties: { file: { type: 'string', format: 'binary' } }
            }
        }),
        UseInterceptors(FileInterceptor('file')),
        Patch('images')
    );

export const ApiGetProductsFilter = () =>
    applyDecorators(
        ApiOperation({
            summary:
                'Получение для фронта фильтров, исходя относительно бд параметров у товаров',
            description: 'Возвращает категории у продуктов к основе фильтров'
        }),
        Get('categories')
    );
