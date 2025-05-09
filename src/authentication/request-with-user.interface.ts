import { User } from '@prisma/client';
import { Request } from 'express';
type UserWithRoles = User & {
    roles: {
        userId: string;
        roleId: string;
        role:{
            id: string;
            name: string;
        }
    }[];
}

interface RequestWithUser extends Request {
    user: UserWithRoles;
}

interface TokenPayload {
    userId: string;
}

export { RequestWithUser, TokenPayload };
