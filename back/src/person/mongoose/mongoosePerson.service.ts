import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person, PersonDocument, PersonTypeWithID } from './person.schema';
import { createPerson } from '@src/utils';

@Injectable()
export class MongoosePersonService {
  constructor(
    @InjectModel(Person.name) private MongoosePerson: Model<PersonDocument>,
  ) {}

  async findAll(): Promise<PersonTypeWithID[]> {
    // todo how to make friends with Person and PersonModel
    const people = await this.MongoosePerson.find().lean().exec();
    return people.map((person) => ({
      ...person,
      _id: person._id.toString(),
    }));
  }
  async createPerson(data?: Partial<Person>): Promise<Person> {
    const newPerson = createPerson();
    return this.MongoosePerson.create(newPerson);
  }
}
