import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { ChatsModule } from './chats/chats.module';
import { RolesModule } from './roles/roles.module';

@Module({
    imports: [
        UsersModule, 
        MessagesModule, 
        ChatsModule,
        RolesModule
    ],
})
export class AppModule {}
