import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ApiHeader } from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/auth/jwt-auth.guard';

@ApiHeader({
  name: 'X-MyHeader',
  description: 'Custom header',
})
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
