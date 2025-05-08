import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { PrismaModule } from '@app/database';

@Module({
    imports: [PrismaModule],
    controllers: [ChatsController],
    providers: [ChatsService],
})
export class ChatsModule {}
