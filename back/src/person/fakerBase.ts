import { createPerson } from '../utils';
import { PersonType } from '@person/mongoose/person.schema';

export const fakerBase: PersonType[] = Array(50)
  .fill(null)
  .map(() => createPerson());
