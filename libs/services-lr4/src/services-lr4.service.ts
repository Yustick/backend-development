import { Injectable } from '@nestjs/common';
import { SingletonService } from './services/singleton.service';
import { TransientService } from './services/transient.service';
import { RequestService } from './services/request.service';

@Injectable()
export class ServicesLr4Service {
    constructor(
        private readonly singletonService: SingletonService,
        private readonly transientService: TransientService,
        private readonly requestService: RequestService
    ) {}

    check() {
        return {
            singleton: this.singletonService.getId(),
            transient1: this.transientService.getId(),
            requestScoped: this.requestService.getId(),
        };
    }
}
