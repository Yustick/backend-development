import { Injectable } from '@nestjs/common';
import { Prisma, PrismaService } from '@app/database';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateMessageDto) {
        return this.prisma.message.create({
          data: {
            content: dto.content,
            chat: {
              connect: { id: dto.chatId },
            },
            author: {
              connect: { id: dto.authorId },
            },
          },
        });
      }

    findAll() {
        return this.prisma.message.findMany({
            include: { author: true, chat: true },
        });
    }

    findOne(id: string) {
        return this.prisma.message.findUnique({
            where: { id },
            include: { author: true, chat: true },
        });
    }

    update(id: string, data: Prisma.MessageUpdateInput) {
        return this.prisma.message.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.message.delete({ where: { id } });
    }
}
