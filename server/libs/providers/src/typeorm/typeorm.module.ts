import { appDataSource } from './typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forRoot(appDataSource.options)]
})
export class TypeormModule {}
