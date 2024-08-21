import { Test, TestingModule } from '@nestjs/testing';
import { GeometryResolver } from './geometry.resolver';
import { GeometryService } from './geometry.service';

describe('GeometryResolver', () => {
  let resolver: GeometryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeometryResolver, GeometryService],
    }).compile();

    resolver = module.get<GeometryResolver>(GeometryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
