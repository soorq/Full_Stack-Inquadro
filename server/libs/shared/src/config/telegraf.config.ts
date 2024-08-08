import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    TelegrafModuleAsyncOptions,
    TelegrafModuleOptions
} from 'nestjs-telegraf';

const telegrafModuleOptions = (
    config: ConfigService
): TelegrafModuleOptions => {
    const apikey = config.get('TELEGRAM_API');

    // const store = Postgres({
    //     user: config.get('POSTGRES_USER'),
    //     database: config.get('POSTGRES_DB'),
    //     host: config.get('POSTGRES_HOST'),
    //     password: config.get('POSTGRES_PASSWORD'),
    //     port: +config.get('POSTGRES_PORT')
    // });

    if (!apikey) Logger.error(`Обязательное поле - |TELEGRAM_API|:${apikey}`);

    return {
        token: apikey
        // middlewares: [session({ store })]
    };
};

export const telegrafInjectOptions = (): TelegrafModuleAsyncOptions => {
    return {
        inject: [ConfigService],
        useFactory: (config: ConfigService) => telegrafModuleOptions(config)
    };
};
