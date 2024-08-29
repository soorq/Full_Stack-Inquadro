import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { EventEmitterModule } from '@nestjs/event-emitter';
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
        ThrottlerModule.forRoot([
            {
                ttl: 60000,
                limit: 10
            }
        ]),
        EventEmitterModule.forRoot({ global: true }),
        TypeormModule,
        RedisModule
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
