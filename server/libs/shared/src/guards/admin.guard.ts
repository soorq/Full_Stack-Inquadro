import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserService } from '../../../../src/user/user.service';
import { TelegrafExecutionContext } from 'nestjs-telegraf';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private readonly admins: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const telegrafCtx =
            TelegrafExecutionContext.create(context).getContext();
        const userId = telegrafCtx.from.id;

        const admins = [910875462];

        if (admins.includes(userId)) {
            telegrafCtx.session.isAdmin = true;
        } else {
            telegrafCtx.session.isAdmin = false;
        }

        return true;
    }
}
