import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignDto, UpdateUserDto } from '@app/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { EAdmin, EUser } from '@app/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService implements UserRepository {
    constructor(
        @InjectRepository(EUser) private readonly userRepo: Repository<EUser>,
        @InjectRepository(EAdmin) private readonly adminRepo: Repository<EAdmin>
    ) {}

    public saveUser = async (dto: SignDto, verifyCode: string) => {
        const user = await this.findUserByEmail(dto.email);

        if (user) {
            await this.updateUser(dto.email, {
                codeVerified: verifyCode
            });

            return { status: 'Ok' };
        }

        const newUser = this.userRepo.create({
            email: dto.email,
            codeVerified: verifyCode
        });

        await this.userRepo.save(newUser);
        return { status: 'OK' };
    };

    public updateUser = async (
        email: string,
        dto: UpdateUserDto
    ): Promise<EUser> => {
        const res = await this.userRepo.update({ email }, { ...dto });

        if (!res.affected) {
            throw new HttpException(
                'Что-то пошло не так',
                HttpStatus.BAD_REQUEST
            );
        }

        return await this.findUserByEmail(email);
    };

    public findUserByEmail(email: string, withCode?: boolean): Promise<EUser> {
        return this.userRepo.findOne({
            where: { email },
            select: withCode && ['email', 'codeVerified']
        });
    }
}
