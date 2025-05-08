import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { Prisma } from 'generated/prisma';

@Injectable()
export class ChatsService {
    constructor(private prisma: PrismaService) {}

    create(data: Prisma.ChatCreateInput) {
        return this.prisma.chat.create({ data });
    }

    findAll() {
        return this.prisma.chat.findMany({
            include: { users: true, messages: true },
        });
    }

    findOne(id: string) {
        return this.prisma.chat.findUnique({
            where: { id },
            include: { users: true, messages: true },
        });
    }

    update(id: string, data: Prisma.ChatUpdateInput) {
        return this.prisma.chat.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.chat.delete({ where: { id } });
    }
}
