import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { fakerBase } from './fakerBase';
import { MongoosePersonService } from '@person/mongoose/mongoosePerson.service';
import { Person, PersonTypeWithID } from '@person/mongoose/person.schema';

@Injectable()
export class PersonService {
  constructor(private readonly db: MongoosePersonService) {}

  create(createPersonDto: CreatePersonDto) {
    return this.db.createPerson();
  }

  async findAll(): Promise<PersonTypeWithID[]> {
    return this.db.findAll();
    /**/
    // return new Promise((resolve) => {
    //   return this.db.findAll();
    //   // return setTimeout(() => resolve(fakerBase), 200);
    // });
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
