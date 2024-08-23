import { Module } from '@nestjs/common';
import { ElementResolver } from './element.resolver';
import { ElementService } from './element.service';
import { Element } from './element.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Element])],
  providers: [ElementResolver, ElementService],
  exports: [ElementService]
})
export class ElementModule {}
