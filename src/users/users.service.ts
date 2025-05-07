import { Injectable } from '@nestjs/common';
import { Prisma, PrismaService } from '@app/database';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    create(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({ data });
    }

    findAll() {
        return this.prisma.user.findMany({ include: { role: true, chats: true } });
    }

    findOne(id: string) {
        return this.prisma.user.findUnique({ where: { id }, include: { role: true, chats: true } });
    }

    update(id: string, data: Prisma.UserUpdateInput) {
        return this.prisma.user.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.user.delete({ where: { id } });
    }
}
