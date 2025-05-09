import { NotFoundException } from '@nestjs/common';

export class UserByEmailNotFoundException extends NotFoundException {
    constructor(email: string) {
        super({
            statusCode: 404,
            message: `User with email '${email}' not found.`,
            error: 'UserByEmailNotFoundException',
        });
    }
}
