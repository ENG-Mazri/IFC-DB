import { Module } from '@nestjs/common';
import { PartofService } from './partof.service';
import { PartofResolver } from './partof.resolver';
import { Partof } from './partof.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Partof])],
  providers: [PartofResolver, PartofService],
  exports: [PartofService]
})
export class PartofModule {}
