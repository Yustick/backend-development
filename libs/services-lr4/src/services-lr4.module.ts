import { Module } from '@nestjs/common';
import { ServicesLr4Service } from './services-lr4.service';
import { SingletonService } from './services/singleton.service';
import { TransientService } from './services/transient.service';
import { ServicesLr4Controller } from './services-lr4.controller';
import { RequestService } from './services/request.service';

@Module({
  providers: [ServicesLr4Service, SingletonService, TransientService, RequestService],
  exports: [ServicesLr4Service],
  controllers: [ServicesLr4Controller],
})
export class ServicesLr4Module {}
