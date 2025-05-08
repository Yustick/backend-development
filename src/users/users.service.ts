import { Injectable } from '@nestjs/common';
import { Prisma, PrismaService } from '@app/database';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(data: Omit<Prisma.UserCreateInput, 'role'>) {
        const defaultRole = await this.prisma.role.findUnique({
            where: { name: 'user' },
        });

        if (!defaultRole) {
            throw new Error('Default role "user" not found');
        }

        return this.prisma.user.create({
            data: {
                ...data,
                role: {
                    connect: { id: defaultRole.id },
                },
            },
        });
    }

    findAll() {
        return this.prisma.user.findMany({
            include: { role: true, chats: true },
        });
    }

    findOne(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
            include: { role: true, chats: true },
        });
    }

    update(id: string, data: Prisma.UserUpdateInput) {
        return this.prisma.user.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.user.delete({ where: { id } });
    }
}
