import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '@app/database';
import { RolesModule } from 'src/roles/roles.module';

@Module({
    imports: [PrismaModule, RolesModule],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
