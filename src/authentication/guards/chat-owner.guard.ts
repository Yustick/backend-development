import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { PrismaService } from '@app/database';
import { RequestWithUser } from 'src/authentication/request-with-user.interface';
import { ChatUser } from '@prisma/client';

@Injectable()
export class ChatOwnerGuard implements CanActivate {
    constructor(private prisma: PrismaService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<RequestWithUser>();
        const user = request.user;
        const chatId = request.params.id;
    
        if (!user || !chatId) {
            throw new ForbiddenException('User or chat ID not found');  
        }
  
        const userChats = await this.prisma.chatUser.findMany({
            where: { chatId },
            orderBy: { joinedAt: 'asc' },
        });
  
        const isOwner = userChats.some((chat: ChatUser) => chat.userId === user.id);
        
        if (isOwner) return true;

        throw new ForbiddenException('You are not the owner of this chat');
    }
}