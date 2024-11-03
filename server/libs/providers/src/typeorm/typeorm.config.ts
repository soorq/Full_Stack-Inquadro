import { DataSource, type DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ENTITIES } from '@app/entities';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(process.cwd(), '.env') });
const cfg = new ConfigService();

const options = (): DataSourceOptions => {
    const { database, host, password, username } = {
        database: cfg.get('POSTGRES_DB'),
        host: cfg.get('POSTGRES_HOST'),
        password: cfg.get('POSTGRES_PASSWORD'),
        username: cfg.get('POSTGRES_USER')
    };

    return {
        host,
        port: 5432,
        password,
        username,
        database,
        type: 'postgres',
        schema: 'public',
        logging: true,
        entities: ENTITIES,
        migrations: [join(process.cwd(), 'migrations', '**', '*.js')],
        migrationsRun: true,
        migrationsTableName: 'migrations',
        synchronize: process.env.NODE_ENV === 'developmnet' || true
    };
};

export const appDataSource = new DataSource(options());
