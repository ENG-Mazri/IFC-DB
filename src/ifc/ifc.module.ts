import { Module } from '@nestjs/common';
import { IfcResolver } from './ifc.resolver';
import { IfcService } from './ifc.service';
import { Ifc } from './ifc.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Ifc])],
  providers: [IfcResolver, IfcService],
  exports: [IfcService]
})
export class IfcModule {}
