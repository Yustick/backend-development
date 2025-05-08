import rateLimit from 'express-rate-limit';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 хвилин
    max: 10, // максимум 50 запитів з одного IP
    message: 'Too many requests, please try again later.',
});

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        limiter(req, res, next);
    }
}
