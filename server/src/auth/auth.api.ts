import { applyDecorators, HttpStatus, Patch, Post, Put } from '@nestjs/common';
import { SignDto, VerifyUserDto } from '@app/shared';
import {
    ApiBadRequestResponse,
    ApiOkResponse,
    ApiOperation
} from '@nestjs/swagger';

export const AuthApiSign = () =>
    applyDecorators(
        ApiOperation({
            summary: 'Регистрация пользователя',
            description:
                'Метод для регистрации пользователя. При успешной регистрации возвращает статус OK и код подтверждения.'
        }),
        ApiOkResponse({
            status: HttpStatus.OK,
            description:
                'Регистрация прошла успешно. Возвращает статус регистрации.',
            type: SignDto
        }),
        ApiBadRequestResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Неверный запрос или проблемы с валидацией данных.'
        }),
        Post('sign')
    );

export const AuthApiVerify = () =>
    applyDecorators(
        ApiOperation({
            summary: 'Подтверждение кода пользователя',
            description:
                'Метод для проверки и подтверждения кода, отправленного пользователю. Возвращает информацию о пользователе при успешной проверке.'
        }),
        ApiOkResponse({
            status: HttpStatus.OK,
            description:
                'Код подтверждения верен. Возвращает информацию о пользователе.',
            type: VerifyUserDto
        }),
        ApiBadRequestResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Неверный запрос или проблемы с валидацией данных.'
        }),
        Put('verify')
    );

export const AuthApiUpdate = () =>
    applyDecorators(
        ApiOperation({
            summary: 'Обновление данных пользователя',
            description:
                'Метод для обновления данных пользователя, таких как статус подтверждения и код подтверждения.'
        }),
        ApiOkResponse({
            status: HttpStatus.OK,
            description: 'Данные пользователя успешно обновлены.',
            type: VerifyUserDto
        }),
        ApiBadRequestResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Неверный запрос или проблемы с валидацией данных.'
        }),
        Patch('update')
    );
