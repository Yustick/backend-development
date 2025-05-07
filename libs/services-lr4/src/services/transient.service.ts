import { Injectable, Scope } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable({scope: Scope.TRANSIENT})
export class TransientService {
    private readonly id: string;

    constructor() {
        this.id = uuidv4();
    }

    public getId(): string {
        return this.id;
    }
}
