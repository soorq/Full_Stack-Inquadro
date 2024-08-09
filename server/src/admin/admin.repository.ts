import { EAdmin } from '@app/entities/admin.entity';

export abstract class AdminRepository {
    abstract save(id: string): Promise<EAdmin>;
    abstract findAll(): Promise<EAdmin[]>;
    abstract findOne(id: string): Promise<EAdmin>;
    abstract delete(id: string): Promise<void>;
}
