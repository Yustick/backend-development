import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    mixin,
    Type,
} from '@nestjs/common';
import { RequestWithUser } from 'src/authentication/request-with-user.interface';
import { Role } from '../../roles/role.enum';

const RoleGuard = (allowedRoles: Role[]): Type<CanActivate> => {
    class RoleGuardMixin implements CanActivate {
        
        canActivate(context: ExecutionContext): boolean {
            const request = context
                .switchToHttp()
                .getRequest<RequestWithUser>();
            const user = request.user;

            if (!user || !user.roles || !Array.isArray(user.roles)) {
                throw new ForbiddenException(
                    'Access denied: no roles assigned'
                );
            }
            const userRoles = user.roles.map((role) => role.role.name);

            const hasRole = userRoles.some((role: Role) =>
                allowedRoles.includes(role)
            );

            if (!hasRole) {
                throw new ForbiddenException(
                    'Access denied: insufficient permissions'
                );
            }

            return true;
        }
    }

    return mixin(RoleGuardMixin);
};

export { RoleGuard };
