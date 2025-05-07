import { Injectable } from '@nestjs/common';
import { Prisma, PrismaService } from '@app/database';

@Injectable()
export class MessagesService {
    constructor(private prisma: PrismaService) {}

    create(data: Prisma.MessageCreateInput) {
        return this.prisma.message.create({ data });
    }

    findAll() {
        return this.prisma.message.findMany({ include: { author: true, chat: true } });
    }

    findOne(id: string) {
        return this.prisma.message.findUnique({ where: { id }, include: { author: true, chat: true } });
    }

    update(id: string, data: Prisma.MessageUpdateInput) {
        return this.prisma.message.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.message.delete({ where: { id } });
    }
}
