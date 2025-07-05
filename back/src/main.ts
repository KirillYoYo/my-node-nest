import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { URI_FOR_CORS } from '../consts';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  BILLING_EXCHANGE,
  BILLING_QUEUE,
  BILLING_ROUTING_KEY,
} from '@src/payments/consts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const rabbitMicro = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: BILLING_QUEUE,
        queueOptions: {
          durable: false,
        },
        exchange: BILLING_EXCHANGE,
        exchangeType: 'direct',
        routingKey: BILLING_ROUTING_KEY,
      },
    },
  );

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const config = new DocumentBuilder()
    .setTitle('API Base Methods:')
    .setDescription('The API Base description')
    .setVersion('1.0')
    .addTag('base')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors({
    origin: URI_FOR_CORS,
    credentials: true,
  });

  await rabbitMicro.listen();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
