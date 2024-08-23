import { Module } from '@nestjs/common';
import { ClassificationService } from './classification.service';
import { ClassificationResolver } from './classification.resolver';
import { Classification } from './classification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Classification])],
  providers: [ClassificationResolver, ClassificationService],
  exports: [ClassificationService]
})
export class ClassificationModule {}
