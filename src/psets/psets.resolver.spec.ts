import { Test, TestingModule } from '@nestjs/testing';
import { PsetsResolver } from './psets.resolver';
import { PsetsService } from './psets.service';

describe('PsetsResolver', () => {
  let resolver: PsetsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PsetsResolver, PsetsService],
    }).compile();

    resolver = module.get<PsetsResolver>(PsetsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
