import { Test, TestingModule } from '@nestjs/testing';
import { PsetsService } from './psets.service';

describe('PsetsService', () => {
  let service: PsetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PsetsService],
    }).compile();

    service = module.get<PsetsService>(PsetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
