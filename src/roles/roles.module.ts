import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaModule } from '@app/database';

@Module({
    imports: [PrismaModule],
    controllers: [RolesController],
    providers: [RolesService],
})
export class RolesModule {}
