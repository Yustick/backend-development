import { NotFoundException } from '@nestjs/common';

export class UserByIdNotFoundException extends NotFoundException {
    constructor(userId: string) {
        super({
            statusCode: 404,
            message: `User with ID '${userId}' not found.`,
            error: 'UserNotFoundException',
        });
    }
}
