import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { UserModule } from '../user/user.module';
import { MailModule } from '../mail/mail.module';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [UserModule, MailModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: AuthRepository,
            useClass: AuthService
        }
    ]
})
export class AuthModule {}
