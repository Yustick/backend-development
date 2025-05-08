import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const authorized = false;
        if (!authorized) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    }
}
