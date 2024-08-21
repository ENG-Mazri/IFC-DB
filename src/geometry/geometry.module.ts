import { Module } from '@nestjs/common';
import { GeometryService } from './geometry.service';
import { GeometryResolver } from './geometry.resolver';
import { Geometry } from './geometry.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Geometry])],
  providers: [GeometryResolver, GeometryService],
  exports: [GeometryService]
})
export class GeometryModule {}
