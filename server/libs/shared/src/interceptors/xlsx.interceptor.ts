import { Observable } from 'rxjs';
import { Request } from 'express';
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadRequestException
} from '@nestjs/common';

@Injectable()
export class FileArchiveInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest<Request>();
        const file = request.file;

        if (!file) {
            throw new BadRequestException('Файл не загружен');
        }

        const validMimeTypes = ['application/xlsx', 'application/xls'];

        if (!validMimeTypes.includes(file.mimetype)) {
            throw new BadRequestException(
                'Можно загружать только архивы (ZIP, TAR, GZIP, 7z, RAR)'
            );
        }

        return next.handle();
    }
}
