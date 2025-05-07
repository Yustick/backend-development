import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SingletonService {
    private readonly id: string;

    constructor() {
        this.id = uuidv4();
    }

    public getId(): string {
        return this.id;
    }
}
