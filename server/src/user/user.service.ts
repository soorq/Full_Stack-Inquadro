import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignDto, UpdateUserDto } from '@app/shared/dto';
import { UserRepository } from './user.repository';
import { EUser } from '@app/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService implements UserRepository {
    constructor(
        @InjectRepository(EUser) private readonly db: Repository<EUser>,
        private readonly emit: EventEmitter2
    ) {}

    public sign = async (createDto: SignDto): Promise<{ status: string }> => {
        const user = await this.findOneByEmail(createDto.email);
        const verifyCode = await this.generateCustomSign();

        if (!user) {
            const newestUser = this.db.create({
                email: createDto.email,
                codeVerified: verifyCode
            });

            await this.db.save(newestUser);

            return { status: 'OK' };
        }
        await this.emit.emitAsync(
            'user.created',
            Object.assign(createDto, { code: verifyCode })
        );

        await this.update(user.email, { codeVerified: verifyCode });

        return { status: 'OK' };
    };

    public verifyCodeSign = async (email: string, code: string) => {
        const user = await this.findOneByEmail(email, true);
        if (!user)
            throw new HttpException(
                'Такого юзера нету',
                HttpStatus.BAD_REQUEST
            );

        if (user.codeVerified !== code)
            throw new HttpException(
                'Не верный код или нету запроса на вход',
                HttpStatus.CONFLICT
            );
        return this.update(email, { isVerifed: true, codeVerified: null });
    };

    public findOneByEmail = async (email: string, withCode?: boolean) => {
        return this.db.findOne({
            where: { email },
            select: { codeVerified: withCode }
        });
    };

    public update = async (email: string, dto: UpdateUserDto) => {
        const user = await this.findOneByEmail(email);

        if (!user)
            throw new HttpException(
                'Такого юзера нету',
                HttpStatus.BAD_REQUEST
            );

        await this.db.update({ email }, dto);
        return user;
    };

    private generateCustomSign = async () => {
        return Array.from({ length: 4 }, () =>
            Math.floor(Math.random() * 10)
        ).join('');
    };
}
