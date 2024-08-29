import { Controller, Get } from '@nestjs/common';
import { YCloudService } from './y-cloud.service';

@Controller('cloud')
export class YCloudController {
    constructor(private readonly service: YCloudService) {}

    @Get()
    async uploadToCloud() {
        return this.service.uploadToCloud(`${process.cwd() + '/static/library'}`);
    }

    @Get('list')
    async getLists() {
        return this.service.getItems()
    }
}
