import { Test, TestingModule } from '@nestjs/testing';
import { PersonResolver } from './person-resolver.resolver';

describe('PersonResolverResolver', () => {
  let resolver: PersonResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonResolver],
    }).compile();

    resolver = module.get<PersonResolver>(PersonResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
