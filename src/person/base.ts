import { createPerson, Person } from '../utils';

export const base: Person[] = Array(50)
  .fill(null)
  .map(() => createPerson());
