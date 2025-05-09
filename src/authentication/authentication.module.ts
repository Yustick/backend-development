import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: 'my-secret-key',
            signOptions: {
                expiresIn: '1800s',
            },
        }),
    ],
    providers: [AuthenticationService, LocalStrategy, JwtStrategy],
    controllers: [AuthenticationController],
})
export class AuthenticationModule {}
