import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, PrismaService } from '@app/database';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(data: Omit<Prisma.UserCreateInput, 'roles'>) {
        const defaultRole = await this.prisma.role.findUnique({
            where: { name: 'user' },
        });

        if (!defaultRole) {
            throw new InternalServerErrorException('Default role "user" not found');
        }

        return this.prisma.user.create({
            data: {
                ...data,
                roles: {
                    create: [
                        {
                            role: {
                                connect: { id: defaultRole.id },
                            },
                        },
                    ],
                },
            },
        });
    }

    findAll(includeRoles = true, includeChats = false) {
        return this.prisma.user.findMany({
            include: { roles: includeRoles, chats: includeChats },
        });
    }

    findOne(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
            include: { roles: true, chats: true },
        });
    }

    update(id: string, data: Prisma.UserUpdateInput) {
        return this.prisma.user.update({ where: { id }, data });
    }

    async remove(id: string) {
        await this.prisma.userRole.deleteMany({ where: { userId: id } });

        return this.prisma.user.delete({ where: { id } });
    }
}
