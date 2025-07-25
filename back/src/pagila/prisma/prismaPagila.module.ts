import { Module } from '@nestjs/common';
import { PrismaPagilaService } from './Prisma.service';

@Module({
  providers: [PrismaPagilaService],
  exports: [PrismaPagilaService],
})
export class PrismaPagilaModule {}
