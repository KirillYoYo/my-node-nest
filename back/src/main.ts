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
import { PaymentsModule } from '@src/payments/payments.module';
import { UsersModule } from '@src/users/users.module';
import { PersonModule } from '@src/person/person.module';
import { TransactionModule } from '@src/bank/transaction/transaction.module';
import { AccountModule } from '@src/bank/account/account.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  });

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

  const swaggerMongoOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    include: [AppModule, PersonModule, PaymentsModule, UsersModule],
  };

  const config = new DocumentBuilder()
    .setTitle('API Mongo Base Methods:')
    .setDescription('Methods for Mongo')
    .setVersion('1.0')
    .addTag('DB1')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, swaggerMongoOptions);
  SwaggerModule.setup('api/mongo', app, documentFactory);

  const configDb2 = new DocumentBuilder()
    .setTitle('API postgres')
    .setDescription('Postrgres methods')
    .setVersion('1.0')
    .addTag('DB2')
    .build();
  const documentDb2 = SwaggerModule.createDocument(app, configDb2, {
    include: [TransactionModule, AccountModule],
  });
  SwaggerModule.setup('api/postgress', app, documentDb2);

  app.enableCors({
    origin: URI_FOR_CORS,
    credentials: true,
  });

  // app.useLogger([]);
  await rabbitMicro.listen();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
