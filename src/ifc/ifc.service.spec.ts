import { Test, TestingModule } from '@nestjs/testing';
import { IfcService } from './ifc.service';

describe('IfcService', () => {
  let service: IfcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IfcService],
    }).compile();

    service = module.get<IfcService>(IfcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
