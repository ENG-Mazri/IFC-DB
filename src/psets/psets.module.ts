import { Module } from '@nestjs/common';
import { PsetsService } from './psets.service';
import { PsetsResolver } from './psets.resolver';
import { Pset } from './pset.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pset])],
  providers: [PsetsResolver, PsetsService],
  exports: [PsetsService]
})
export class PsetsModule {}
