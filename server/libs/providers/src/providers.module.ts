import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeormModule } from './typeorm/typeorm.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { RedisModule } from './redis/redis.module';
import { AllExceptionsFilter } from '@app/shared';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { join } from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: join(process.cwd(), '.env')
        }),
        RedisModule,
        TypeormModule,
        ThrottlerModule.forRoot([
            {
                ttl: 60000,
                limit: 10
            }
        ])
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter
        },
        {
            provide: APP_GUARD,
            useValue: ThrottlerGuard
        }
    ]
})
export class ProvidersModule {}
