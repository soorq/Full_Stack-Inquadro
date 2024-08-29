import { YCloudController } from './y-cloud.controller';
import { YCloudService } from './y-cloud.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
    controllers: [YCloudController],
    providers: [YCloudService],
    exports: [YCloudService]
})
export class YCloudModule {}
