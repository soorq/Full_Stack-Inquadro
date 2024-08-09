import { EAdmin } from '@app/entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([EAdmin])],
    providers: [AdminService],
    exports: [AdminService]
})
export class AdminModule {}
