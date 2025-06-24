import { Query, Resolver } from '@nestjs/graphql';
import { PersonService } from '../person.service';
import { PersonModel } from '../person.model';

@Resolver()
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}

  @Query(() => [PersonModel])
  person(): Promise<PersonModel[]> {
    return this.personService.findAll();
  }
}
