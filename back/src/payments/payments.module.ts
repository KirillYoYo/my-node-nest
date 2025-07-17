import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import {
  BILLING_EXCHANGE,
  BILLING_QUEUE,
  BILLING_ROUTING_KEY,
  PAYMENT_SERVICE,
} from '@src/payments/consts';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PAYMENT_SERVICE,
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
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
