import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        CacheModule.registerAsync({
            isGlobal: true,
            imports: [ConfigModule],
            useFactory: async (cfg: ConfigService) => ({
                store: redisStore,
                url: cfg.get('REDIS_URL')
            }),
            inject: [ConfigService]
        })
    ]
})
export class RedisModule {}
