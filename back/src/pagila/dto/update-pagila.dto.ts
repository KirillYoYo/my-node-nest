import { PartialType } from '@nestjs/mapped-types';
import { CreatePagilaDto } from './create-pagila.dto';

export class UpdatePagilaDto extends PartialType(CreatePagilaDto) {}
