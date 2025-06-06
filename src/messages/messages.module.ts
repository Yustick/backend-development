import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaModule } from '@app/database';

@Module({
    imports: [PrismaModule],
    controllers: [MessagesController],
    providers: [MessagesService],
})
export class MessagesModule {}
