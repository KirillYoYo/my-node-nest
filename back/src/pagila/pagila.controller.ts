import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PagilaService } from './pagila.service';
import { CreatePagilaDto } from './dto/create-pagila.dto';
import { UpdatePagilaDto } from './dto/update-pagila.dto';

@Controller('pagila')
export class PagilaController {
  constructor(private readonly pagilaService: PagilaService) {}

  @Post()
  create(@Body() createPagilaDto: CreatePagilaDto) {
    return this.pagilaService.create(createPagilaDto);
  }

  @Get()
  findAll() {
    return this.pagilaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagilaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePagilaDto: UpdatePagilaDto) {
    return this.pagilaService.update(+id, updatePagilaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagilaService.remove(+id);
  }
}
