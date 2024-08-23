import { Test, TestingModule } from '@nestjs/testing';
import { PartofResolver } from './partof.resolver';
import { PartofService } from './partof.service';

describe('PartofResolver', () => {
  let resolver: PartofResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartofResolver, PartofService],
    }).compile();

    resolver = module.get<PartofResolver>(PartofResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
