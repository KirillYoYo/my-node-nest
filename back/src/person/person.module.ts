import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { PersonResolver } from '@person/grapQL-person-resolver/person-resolver.resolver';
import { MongoosePersonService } from '@person/mongoose/mongoosePerson.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Person } from '@person/entities/person.entity';
import { PersonSchema } from '@person/mongoose/person.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
  ],
  controllers: [PersonController],
  providers: [PersonService, PersonResolver, MongoosePersonService],
})
export class PersonModule {}
