import { EUser } from '@app/entities';
import { SignDto } from '@app/shared';

export abstract class AuthRepository {
    abstract signUser(dto: SignDto): Promise<{ isSent: boolean }>;
    abstract verifyUserCode(email: string, code: string): Promise<EUser>;
}
