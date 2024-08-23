import { Test, TestingModule } from '@nestjs/testing';
import { PartofService } from './partof.service';

describe('PartofService', () => {
  let service: PartofService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartofService],
    }).compile();

    service = module.get<PartofService>(PartofService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
