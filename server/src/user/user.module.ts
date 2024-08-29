import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EAdmin, EUser } from '@app/entities';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([EUser, EAdmin])],
    providers: [
        UserService,
        {
            provide: UserRepository,
            useClass: UserService
        }
    ],
    exports: [UserService]
})
export class UserModule {}
