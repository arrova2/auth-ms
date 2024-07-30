import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './config';

async function bootstrap() {

  const logger = new Logger('Auth-ms');

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )

  app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.NATS,
      options: {
        servers: envs.natsServers
      },
    },
    { inheritAppConfig: true }
  );

  await app.startAllMicroservices();
  await app.listen(envs.port);

  logger.log(`Payments Microservice running on port ${ envs.port }`);
}
bootstrap();
