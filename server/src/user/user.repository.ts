import { SignDto, UpdateUserDto } from '@app/shared';
import { EUser } from '@app/entities';

export abstract class UserRepository {
    abstract findOneByEmail(email: string): Promise<EUser>;
    abstract sign(dto: SignDto): Promise<{ status: string }>;
    abstract update(email: string, dto: UpdateUserDto): Promise<EUser>;
    abstract verifyCodeSign(email: string, code: string): Promise<EUser>;
}
