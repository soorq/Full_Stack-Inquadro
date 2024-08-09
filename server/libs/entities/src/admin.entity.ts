import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admins')
export class EAdmin {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({ type: 'varchar' })
    telegram_id: string;

    @Column({ default: true })
    isActive: boolean;
}
