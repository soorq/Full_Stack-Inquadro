import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { EAdmin } from '@app/entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService implements AdminRepository {
    constructor(
        @InjectRepository(EAdmin)
        private readonly db: Repository<EAdmin>
    ) {}

    public save = async (telegram_id: string) => {
        const isExist = await this.findOne(telegram_id);

        if (isExist) {
            throw new HttpException(
                'Такой админ уже существует!',
                HttpStatus.BAD_REQUEST
            );
        }

        const newestAdmin = await this.db.create({
            telegram_id
        });

        return this.db.save(newestAdmin);
    };

    public delete = async (id: string) => {
        const isExist = await this.findOne(id);

        if (!isExist) {
            throw new HttpException(
                'Такого админа не существует!',
                HttpStatus.BAD_REQUEST
            );
        }

        await this.db.delete(isExist.id);
    };

    public findAll = async (): Promise<EAdmin[]> => {
        return this.db.find();
    };

    public findOne = async (telegram_id: string): Promise<EAdmin> => {
        return this.db.findOneBy({ telegram_id });
    };
}
