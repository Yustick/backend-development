import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { CreateMessageDto } from './dto/create-message.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class MessagesService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateMessageDto, userId: string) {
        return this.prisma.message.create({
            data: {
                content: dto.content,
                chat: {
                    connect: { id: dto.chatId },
                },
                author: {
                    connect: { id: userId },
                },
            },
        });
    }

    async findAllForUserOrAdmin(userId: string, roles: string[] ) {
        const isAdmin = roles.includes('admin');
        
        return this.prisma.message.findMany({
            where: isAdmin ? {} : { authorId: userId },
            include: { chat: true },
        });
    }

    async findOwnerMessage(id: string) {
        const message = await this.prisma.message.findUnique({
            where: { id },
            select: { authorId: true },
        });
        return message
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
