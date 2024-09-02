import { ApiProperty } from '@nestjs/swagger';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn
} from 'typeorm';

@Entity('user')
export class EUser {
    @ApiProperty({
        type: 'string',
        title: 'Уникальный идентификатор'
    })
    @PrimaryGeneratedColumn('increment')
    id: string;

    @ApiProperty({
        type: 'string',
        title: 'Номер телефона'
    })
    @Column({ type: 'varchar', nullable: true })
    phone: string;

    @ApiProperty({
        type: 'string',
        title: 'Имя'
    })
    @Column({ type: 'varchar', nullable: true })
    name: string;

    @ApiProperty({
        type: 'string',
        title: 'Адресс Электронной почты'
    })
    @Column({ type: 'varchar', unique: true })
    email: string;

    @ApiProperty({
        type: 'string',
        title: 'Размеры'
    })
    @Column({ type: 'boolean', default: false })
    isVerifed: boolean;

    @ApiProperty({
        type: 'string',
        title: 'Адрес'
    })
    @Column({ type: 'varchar', nullable: true })
    address: string;

    @ApiProperty({
        type: 'string',
        title: 'Подъезд'
    })
    @Column({ type: 'varchar', nullable: true })
    entrance: string;

    @Column({ type: 'varchar', nullable: true, select: false })
    codeVerified: string;

    @ApiProperty({
        type: 'string',
        title: 'Город'
    })
    @Column({ type: 'varchar', nullable: true })
    city: string;

    @ApiProperty({
        type: 'string',
        title: 'Дата создания',
        description: 'Автоматически сам высчитывает время'
    })
    @CreateDateColumn()
    createdAt: string;

    @ApiProperty({
        type: 'string',
        title: 'Дата обновления',
        description: 'Автоматические сам высчитывает время'
    })
    @UpdateDateColumn()
    updatedAt: string;
}
