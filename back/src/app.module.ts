import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from '@person/person.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, PersonSchema } from '@person/mongoose/person.schema';
import { ImportService } from '@src/ImportDb.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaymentsModule } from '@src/payments/payments.module';
import { BillingModule } from '@src/billing/billing.module';
import { TransactionModule } from '@src/bank/transaction/transaction.module';
import { AccountModule } from '@src/bank/account/account.module';
import { PrismaModule } from '@src/bank/prisma/prisma.module';
import { PrismaPagilaModule } from '@src/pagila/prisma/prismaPagila.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from '../servicesNames';
import { AuthController } from '@src/auth-gateway/auth.controller';
import { JwtStrategy } from '@src/auth-gateway/jwt.strategy';
import { JwtAuthGuard } from '@src/auth-gateway/jwt-auth.guard';
import { JwtCookieStrategy } from '@src/auth-gateway/jwt.cokie.strategy';
import { JwtCookieAuthGuard } from '@src/auth-gateway/jwt.cookieGuard';

const isDev = process.env.NODE_ENV === 'development';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'auth_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get<string>('MONGO_USERNAME');
        const password = configService.get<string>('MONGO_PASSWORD');
        const host = configService.get<string>('MONGO_HOST');
        const port = configService.get<string>('MONGO_PORT');
        const db = configService.get<string>('MONGO_DB');
        const authSource = configService.get<string>('MONGO_AUTH_SOURCE');

        const uri = `mongodb://${username}:${password}@${isDev ? 'localhost' : host}:${port}/${db}?authSource=${authSource}`;

        return { uri };
      },
      inject: [ConfigService],
    }),
    PersonModule,
    PaymentsModule,
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
    BillingModule,
    PrismaModule,
    PrismaPagilaModule,
    TransactionModule,
    AccountModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    ImportService,
    JwtStrategy,
    JwtCookieStrategy,
    JwtAuthGuard,
    JwtCookieAuthGuard,
  ],
  exports: [JwtAuthGuard, JwtCookieAuthGuard],
})
export class AppModule {
  // пока app.enableCors в main.ts
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(CorsMiddleware).forRoutes('person');
  // }
}
