import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatsService {
    create(createChatDto: CreateChatDto) {
		createChatDto
        return 'This action adds a new chat';
    }

    findAll() {
        return `This action returns all chats`;
    }

    findOne(id: string) {
        return `This action returns a #${id} chat`;
    }

    update(id: string, updateChatDto: UpdateChatDto) {
        return `This action updates a #${id} chat`;
    }

    remove(id: string) {
        return `This action removes a #${id} chat`;
    }
}
