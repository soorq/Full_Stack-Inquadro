import {
    Injectable,
    NestMiddleware,
    UnauthorizedException
} from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class UserAgentMiddleware implements NestMiddleware {
    private blockedUserAgents: string[] = [
        'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)',
        'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)',
        'curl/7.64.1',
        'Wget/1.20.3 (linux-gnu)',
        'sqlmap/1.5.2',
        'Nessus v6.10.7',
        'Scrapy/2.3.0 (+https://scrapy.org)',
        'python-requests/2.25.1',
        'BadBot/1.0 (webmaster@badbot.com)'
    ];

    use(req: Request, res: Response, next: NextFunction) {
        const userAgent = req.headers['user-agent'] || '';

        if (this.blockedUserAgents.includes(userAgent)) {
            throw new UnauthorizedException(
                'Access denied: Your User-Agent is blocked'
            );
        } else {
            next();
        }
    }
}
