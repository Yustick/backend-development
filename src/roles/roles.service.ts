import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaService, Role } from '@app/database';

@Injectable()
export class RolesService {
    constructor(private prisma: PrismaService) {}

    create(data: Prisma.RoleCreateInput): Promise<Role> {
        return this.prisma.role.create({ data });
    }

    findAll(): Promise<Role[]> {
        return this.prisma.role.findMany({ include: { users: true } });
    }

    findOne(id: string): Promise<Role | null> {
        return this.prisma.role.findUnique({
            where: { id },
            include: { users: true },
        });
    }

    update(id: string, data: Prisma.RoleUpdateInput): Promise<Role> {
        return this.prisma.role.update({ where: { id }, data });
    }

    remove(id: string): Promise<Role> {
        return this.prisma.role.delete({ where: { id } });
    }

    async findByName(name: string): Promise<Role | null> {
        const role = await this.prisma.role.findUnique({ where: { name } });
        if (!role) {
            throw new NotFoundException(`Role "${name}" not found`);
        }
        return role;
    }
}
