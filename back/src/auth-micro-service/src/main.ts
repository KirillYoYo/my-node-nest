import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  try {
    console.log('start auth microservice');
    const app = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'auth_queue',
        queueOptions: { durable: false },
      },
    });
    await app.listen();
  } catch (e) {
    console.error('Error in bootstrap:', e);
  }
}
bootstrap();
