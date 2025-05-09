import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
import { RequestWithUser } from '../request-with-user.interface';
import { MessagesService } from 'src/messages/messages.service';
  
  @Injectable()
  export class MessageOwnerGuard implements CanActivate {
    constructor(private readonly messagesService: MessagesService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<RequestWithUser>();
        const userId = request.user.id;
        const messageId = request.params.id;
    
        const message = await this.messagesService.findOwnerMessage(messageId);
    
        if (!message || message.authorId !== userId) {
            throw new ForbiddenException('You are not allowed to modify this message');
        }
    
        return true;
    }
  }