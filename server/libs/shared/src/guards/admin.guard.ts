import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { TelegrafExecutionContext } from 'nestjs-telegraf';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private readonly admins: AdminService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const telegrafCtx =
            TelegrafExecutionContext.create(context).getContext();
        const userId = telegrafCtx.from.id;

        const admins = await this.admins
            .findAll()
            .then(res => res.map(admin => +admin.telegram_id));

        console.log(admins);

        if (admins.includes(userId)) {
            telegrafCtx.session.isAdmin = true;
        } else {
            telegrafCtx.session.isAdmin = false;
        }

        return true;
    }
}
