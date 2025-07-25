import { Test, TestingModule } from '@nestjs/testing';
import { PagilaService } from './pagila.service';

describe('PagilaService', () => {
  let service: PagilaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PagilaService],
    }).compile();

    service = module.get<PagilaService>(PagilaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
