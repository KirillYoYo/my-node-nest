import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { PersonResolver } from './person-resolver/person-resolver.resolver';

@Module({
  controllers: [PersonController],
  providers: [PersonService, PersonResolver],
})
export class PersonModule {}
