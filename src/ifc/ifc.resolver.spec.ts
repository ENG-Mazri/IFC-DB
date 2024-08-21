import { Test, TestingModule } from '@nestjs/testing';
import { IfcResolver } from './ifc.resolver';

describe('IfcResolver', () => {
  let resolver: IfcResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IfcResolver],
    }).compile();

    resolver = module.get<IfcResolver>(IfcResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
