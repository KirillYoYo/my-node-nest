import { Module } from '@nestjs/common';
import { PagilaService } from './pagila.service';
import { PagilaController } from './pagila.controller';

@Module({
  controllers: [PagilaController],
  providers: [PagilaService],
})
export class PagilaModule {}
