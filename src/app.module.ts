import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { ChatsModule } from './chats/chats.module';
import { ServicesLr4Module } from '@app/services-lr4';

@Module({
    imports: [UsersModule, MessagesModule, ChatsModule,
      ServicesLr4Module
    ],
})
export class AppModule {}
