import { DataSource, type DataSourceOptions } from 'typeorm';
import { ENTITIES } from '../../../entities/src';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(process.cwd(), '.env') });
const cfg = new ConfigService();

const options = (): DataSourceOptions => {
    const url = cfg.get('DATABASE_URL');

    const urlRedis = cfg.get('REDIS_URL');
    if (!url || !urlRedis) {
        Logger.error('Database URL or Redis URL is empty');
        process.exit();
    }

    return {
        url,
        type: 'postgres',
        schema: 'public',
        logging: true,
        entities: ENTITIES,
        migrations: [join(process.cwd(), 'migrations', '**', '*.js')],
        migrationsRun: true,
        migrationsTableName: 'migrations',
        synchronize: process.env.NODE_ENV === 'developmnet' || true,
        cache: {
            type: 'redis',
            tableName: 'redis',
            duration: 60000,
            options: {
                url: urlRedis
            }
        }
    };
};

export const appDataSource = new DataSource(options());
