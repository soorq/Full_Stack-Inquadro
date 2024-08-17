import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { EUser } from '@app/entities';

@Module({
    imports: [TypeOrmModule.forFeature([EUser])],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
