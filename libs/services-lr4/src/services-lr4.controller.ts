import { Controller, Get, Inject } from '@nestjs/common';
import { ServicesLr4Service } from './services-lr4.service';
import { TransientService } from './services/transient.service';

@Controller('lr4')
export class ServicesLr4Controller {
    @Inject(ServicesLr4Service)
    private readonly service: ServicesLr4Service;

    @Inject(TransientService)
    private readonly transientService: TransientService;        

    @Get()
    check() {
        const ids = this.service.check()
        
        const result = {
            singleton: ids.singleton,
            transient1: ids.transient1,
            transient2: this.transientService.getId(),
            requestScoped: ids.requestScoped,
        }
        console.log('ids', result);
        return result;
    }
}
