import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './request-with-user.interface';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async register(data: Omit<Prisma.UserCreateInput, 'roles'>) {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const createdUser = await this.usersService.create({
            ...data,
            password: hashedPassword,
        });

        createdUser.password = undefined;

        return createdUser;
    }

    async getAuthenticatedUser(email: string, plainTextPassword: string) {
        try {
            const user = await this.usersService.findByEmail(email);

            await this.verifyPassword(plainTextPassword, user.password);

            user.password = undefined;
            return user;
        } catch {
            throw new HttpException(
                'Wrong credentials provided',
                HttpStatus.BAD_REQUEST
            );
        }
    }

    public getCookieWithJwtToken(userId: string) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=1800`;
    }

    public getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }

    private async verifyPassword(
        plainTextPassword: string,
        hashedPassword: string
    ) {
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword
        );
        if (!isPasswordMatching) {
            throw new HttpException(
                'Wrong credentials provided',
                HttpStatus.BAD_REQUEST
            );
        }
    }
}
