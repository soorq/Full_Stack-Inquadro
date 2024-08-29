import { SignDto, UpdateUserDto } from '@app/shared';
import { EUser } from '@app/entities';

export abstract class UserRepository {
    abstract saveUser(
        dto: SignDto,
        verifyCode: string
    ): Promise<{ status: string }>;
    abstract findUserByEmail(email: string, withCode?: boolean): Promise<EUser>;
    abstract updateUser(email: string, dto: UpdateUserDto): Promise<EUser>;
}
