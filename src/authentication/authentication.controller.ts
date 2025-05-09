import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthenticationService } from './authentication.service';
import { LocalAuthenticationGuard } from './guards/local-authentication.guard';
import { RequestWithUser } from './request-with-user.interface';
import { Response } from 'express';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';

@Controller('api/v1/authentication')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) {}

    @Post('register')
    async register(@Body() registrationData: CreateUserDto) {
        return this.authenticationService.register(registrationData);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    async login(@Req() request: RequestWithUser, @Res() response: Response) {
        const { user } = request;
        const cookie = this.authenticationService.getCookieWithJwtToken(
            user.id
        );
        response.setHeader('Set-Cookie', cookie);
        user.password = undefined;
        return response.send(user);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('logout')
    async logout(@Req() request: RequestWithUser, @Res() response: Response) {
        response.setHeader(
            'Set-Cookie',
            this.authenticationService.getCookieForLogOut()
        );
        return response.sendStatus(200);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
        const user = request.user;
        user.password = undefined;
        return user;
    }
}
