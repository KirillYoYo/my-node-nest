import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { URI_FOR_CORS } from '../consts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
