import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginationDto {
    @ApiPropertyOptional({ description: 'Пропуск строк', type: 'number' })
    @IsOptional()
    @Min(0)
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Type(() => Number)
    offset = 0;

    @ApiPropertyOptional({ description: 'Количество строк', type: 'number' })
    @IsOptional()
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Type(() => Number)
    @IsPositive()
    limit = 15;
}
