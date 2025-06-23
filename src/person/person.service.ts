import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { base } from './base';
import { Person } from '../utils';

@Injectable()
export class PersonService {
  create(createPersonDto: CreatePersonDto) {
    return 'This action adds a new person';
  }

  async findAll(): Promise<Person[]> {
    return new Promise((resolve) => setTimeout(() => resolve(base), 200));
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
