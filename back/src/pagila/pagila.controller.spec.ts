import { Test, TestingModule } from '@nestjs/testing';
import { PagilaController } from './pagila.controller';
import { PagilaService } from './pagila.service';

describe('PagilaController', () => {
  let controller: PagilaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagilaController],
      providers: [PagilaService],
    }).compile();

    controller = module.get<PagilaController>(PagilaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
