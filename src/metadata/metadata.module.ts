import { Module } from '@nestjs/common';
import { MetaDataService } from './metadata.service';
import { MetadataResolver } from './metadata.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaData } from './metadata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MetaData])],
  providers: [MetaDataService, MetadataResolver],
  exports: [MetaDataService]
})
export class MetadataModule {}
