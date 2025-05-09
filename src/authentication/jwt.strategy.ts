import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { TokenPayload } from './request-with-user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.cookies?.Authentication;
                },
            ]),
            secretOrKey: 'my-secret-key',
        });
    }

    async validate(payload: TokenPayload) {
        return this.userService.findOne(payload.userId);
    }
}
