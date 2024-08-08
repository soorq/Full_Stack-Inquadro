import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { EProduct } from '@app/entities';
import {
    ApiBadRequestResponse,
    ApiOkResponse,
    ApiOperation,
    ApiQuery
} from '@nestjs/swagger';
import {
    applyDecorators,
    Get,
    HttpStatus,
    UseInterceptors
} from '@nestjs/common';

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
        CacheTTL(600),
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
        CacheTTL(600),
        Get('get/:id'),
        CacheKey('Product' + ':id')
    );

export const ApiGetManyProductsByPagination = () =>
    applyDecorators(
        ApiOperation({
            summary: 'Получение отсортированных',
            description: 'Для получения сортированных постов'
        }),
        ApiOkResponse({
            status: HttpStatus.OK,
            type: EProduct,
            description: 'Отдает фильтрованные посты по бд'
        }),
        ApiBadRequestResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Плохой запроос или не найдены данные'
        }),
        UseInterceptors(CacheInterceptor),
        CacheKey('Products-pagination'),
        CacheTTL(60000),
        Get('pagination')
    );

export const ApiGetManyProductsByParams = () =>
    applyDecorators(
        ApiOperation({
            summary: 'Получение отсортированных по параметру фильтров',
            description: 'Для получения сортированных постов'
        }),
        ApiOkResponse({
            status: HttpStatus.OK,
            isArray: true,
            description: 'Отдает отстортирование по квери данным - посты по бд',
            type: EProduct
        }),
        ApiBadRequestResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Плохой запроос или не найдены данные'
        }),
        ApiQuery({ type: 'string', required: false, name: 'author' }),
        ApiQuery({ type: 'Date', required: false, name: 'start' }),
        ApiQuery({ type: 'Date', required: false, name: 'end' }),
        ApiQuery({
            type: 'string',
            required: false,
            name: 'categories',
            example: '1,2,3'
        }),
        UseInterceptors(CacheInterceptor),
        CacheTTL(30000),
        Get('filter')
    );
