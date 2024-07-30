import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICE, envs } from 'src/config';

@Module({
    imports: [
        ClientsModule.register([
            {
            // name: PRODUCT_SERVICE, 
            name: NATS_SERVICE,
            // transport: Transport.TCP,
            transport: Transport.NATS,
            options: {
                // host: envs.productsMicroserviceHost,
                // port: envs.productsMicroservicePort,
                servers: envs.natsServers,
            }
            },
        ])
    ],
    exports: [
        ClientsModule.register([
            {
              // name: PRODUCT_SERVICE, 
              name: NATS_SERVICE,
              // transport: Transport.TCP,
              transport: Transport.NATS,
              options: {
                // host: envs.productsMicroserviceHost,
                // port: envs.productsMicroservicePort,
                servers: envs.natsServers,
              }
            },
          ])
    ]
})
export class NatsModule {}
