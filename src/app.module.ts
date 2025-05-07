import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { ChatsModule } from './chats/chats.module';

@Module({
    imports: [UsersModule, MessagesModule, ChatsModule],
})
export class AppModule {}
