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
import { UsersModule } from '@src/users/users.module';
import { AuthModule } from '@src/auth/auth.module';
import { PaymentsModule } from '@src/payments/payments.module';
import { BillingModule } from '@src/billing/billing.module';
import { TransactionController } from '@src/bank/transaction/transaction.controller';
import { TransactionModule } from '@src/bank/transaction/transaction.module';
import { AccountModule } from '@src/bank/account/account.module';
import { PrismaModule } from '@src/bank/prisma/prisma.module';
import { PrismaPagilaModule } from '@src/pagila/prisma/prismaPagila.module';

const isDev = process.env.NODE_ENV === 'development';

@Module({
  imports: [
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
    AuthModule,
    UsersModule,
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
    BillingModule,
    PrismaModule,
    PrismaPagilaModule,
    TransactionModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService, ImportService],
})
export class AppModule {
  // пока app.enableCors в main.ts
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(CorsMiddleware).forRoutes('person');
  // }
}
