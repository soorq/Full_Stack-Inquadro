import { Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    TelegrafModuleAsyncOptions,
    TelegrafModuleOptions
} from 'nestjs-telegraf';
import { Postgres } from '@telegraf/session/pg';
import { session } from 'telegraf';

const telegrafModuleOptions = (
    config: ConfigService
): TelegrafModuleOptions => {
    const apikey = config.get('TELEGRAM_API');

    const store = Postgres({
        database: config.get<string>('POSTGRES_DB'),
        host: config.get<string>('POSTGRES_HOST'),
        user: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        onInitError(err) {
            throw new NotFoundException(`Config value in not found`, err);
        }
    });

    if (!apikey) Logger.error(`Обязательное поле - |TELEGRAM_API|:${apikey}`);

    return {
        token: apikey,
        middlewares: [session({ store })]
    };
};

export const telegrafInjectOptions = (): TelegrafModuleAsyncOptions => {
    return {
        inject: [ConfigService],
        useFactory: (config: ConfigService) => telegrafModuleOptions(config)
    };
};
