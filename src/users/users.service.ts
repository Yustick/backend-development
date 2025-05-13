import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import {
    UserByEmailNotFoundException,
    UserByIdNotFoundException,
} from '@app/exceptions';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/role.enum';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private readonly rolesService: RolesService
    ) {}

    async create(data: Omit<Prisma.UserCreateInput, 'roles'>) {
        const user = await this.prisma.user.create({
            data,
        });

        await this.assignRole(user.id, Role.USER);

        return user;
    }

    findAll(includeRoles = true, includeChats = false) {
        return this.prisma.user.findMany({
            include: { 
                roles: { 
                    include: {
                        role: includeRoles
                    }
                }, 
                chats: { 
                    include: {
                        chat: includeChats
                    }
                },
            },
        });
    }

    async findOne(id: string, includeRoles = true, includeChats = false) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { 
                roles: { 
                    include: {
                        role: includeRoles
                    }
                }, 
                chats: { 
                    include: {
                        chat: includeChats
                    }
                },
            },
        });

        if (!user) throw new UserByIdNotFoundException(id);

        return user;
    }

    async findByEmail(email: string, includeRoles = true, includeChats = false) {
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: { 
                roles: { 
                    include: {
                        role: includeRoles
                    }
                }, 
                chats: { 
                    include: {
                        chat: includeChats
                    }
                },
            },
        });

        if (!user) throw new UserByEmailNotFoundException(email);

        return user;
    }

    update(id: string, data: Prisma.UserUpdateInput) {
        return this.prisma.user.update({ where: { id }, data });
    }

    async remove(id: string) {
        await this.prisma.userRole.deleteMany({ where: { userId: id } });

        return this.prisma.user.delete({ where: { id } });
    }

    async assignRole(userId: string, roleName: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new UserByIdNotFoundException(userId);
        }

        const role = await this.rolesService.findByName(roleName);

        const existing = await this.prisma.userRole.findUnique({
            where: {
                userId_roleId: {
                    userId,
                    roleId: role.id,
                },
            },
        });

        if (existing) {
            throw new ConflictException(`User already has role "${roleName}"`);
        }

        return this.prisma.userRole.create({
            data: {
                user: { connect: { id: userId } },
                role: { connect: { id: role.id } },
            },
        });
    }
}
