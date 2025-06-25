import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from '@person/person.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, PersonSchema } from '@person/mongoose/person.schema';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/mydatabase'),
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
    PersonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // пока app.enableCors в main.ts
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(CorsMiddleware).forRoutes('person');
  // }
}
