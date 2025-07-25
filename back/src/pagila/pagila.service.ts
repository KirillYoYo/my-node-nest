import { Injectable } from '@nestjs/common';
import { CreatePagilaDto } from './dto/create-pagila.dto';
import { UpdatePagilaDto } from './dto/update-pagila.dto';

@Injectable()
export class PagilaService {
  create(createPagilaDto: CreatePagilaDto) {
    return 'This action adds a new pagila';
  }

  findAll() {
    return `This action returns all pagila`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pagila`;
  }

  update(id: number, updatePagilaDto: UpdatePagilaDto) {
    return `This action updates a #${id} pagila`;
  }

  remove(id: number) {
    return `This action removes a #${id} pagila`;
  }
}
