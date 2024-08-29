import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { UserService } from '../user/user.service';
import { MailService } from '../mail/mail.service';
import { SignDto } from '@app/shared';
import { EUser } from '@app/entities';

@Injectable()
export class AuthService implements AuthRepository {
    constructor(
        private userService: UserService,
        private mail: MailService
    ) {}

    public async signUser(dto: SignDto) {
        const verifyCode = await this.generateCustomSign();
        const isSent = await this.mail.sendCodeToVerify({
            email: dto.email,
            code: verifyCode
        });

        if (!isSent) {
            throw new HttpException(
                'почта не действительна',
                HttpStatus.BAD_REQUEST
            );
        }

        await this.userService.saveUser(dto, verifyCode);

        return { isSent };
    }

    public async verifyUserCode(email: string, code: string): Promise<EUser> {
        const user = await this.userService.findUserByEmail(email, true);
        if (!user)
            throw new HttpException(
                'Такого юзера нету',
                HttpStatus.BAD_REQUEST
            );

        if (user.codeVerified !== code) {
            throw new HttpException('Неверный код', HttpStatus.CONFLICT);
        }

        return this.userService.updateUser(email, {
            isVerifed: true,
            codeVerified: null
        });
    }

    private async generateCustomSign(): Promise<string> {
        return Array.from({ length: 4 }, () =>
            Math.floor(Math.random() * 10)
        ).join('');
    }
}
