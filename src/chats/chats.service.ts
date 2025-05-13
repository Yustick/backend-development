import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChatsService {
    constructor(private prisma: PrismaService) {}

    create(data: Prisma.ChatCreateInput, userIds: string[]) {
        return this.prisma.chat.create({
            data: {
                ...data,
                users: {
                    create: userIds.map(userId => ({
                        user: { connect: { id: userId } },
                    })),
                },
            },
            include: {
                users: true,
            },
        });
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
