import { Module } from '@nestjs/common';
import { ProxyService } from './service/proxy.service.js';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        HttpModule,
    ],
    controllers: [],
    providers: [ProxyService],
    exports: [ProxyService],
})
export class ProxyModule {}
