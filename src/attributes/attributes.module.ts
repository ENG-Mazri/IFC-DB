import { Module } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { AttributesResolver } from './attributes.resolver';
import { Attribute } from './attribute.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute])],
  providers: [AttributesResolver, AttributesService],
  exports: [AttributesService]
})
export class AttributesModule {}
