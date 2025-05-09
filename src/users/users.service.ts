import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Prisma, PrismaService } from '@app/database';
import {
    UserByEmailNotFoundException,
    UserByIdNotFoundException,
} from '@app/exceptions';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService,
        private readonly rolesService: RolesService,
    ) {}

    async create(data: Omit<Prisma.UserCreateInput, 'roles'>) {
        const user = await this.prisma.user.create({
            data,
        });
    
        await this.assignRole(user.id, 'user');
    
        return user;
    }

    findAll(includeRoles = true, includeChats = false) {
        return this.prisma.user.findMany({
            include: { roles: includeRoles, chats: includeChats },
        });
    }

    async findOne(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { roles: true, chats: true },
        });

        console.log(user);

        if (!user) throw new UserByIdNotFoundException(id);

        return user;
    }

    async findByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: { roles: true, chats: true },
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
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
    
        const role = await this.prisma.role.findUnique({ where: { name: roleName } });
        if (!role) {
            throw new NotFoundException(`Role "${roleName}" not found`);
        }
    
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
