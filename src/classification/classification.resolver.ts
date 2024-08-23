import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClassificationService } from './classification.service';
import { Classification } from './classification.entity';
import { CreateClassificationInput } from './dto/create-classification.input';
import { UpdateClassificationInput } from './dto/update-classification.input';

@Resolver(() => Classification)
export class ClassificationResolver {
  constructor(private readonly classificationService: ClassificationService) {}

  // @Mutation(() => Classification)
  // createClassification(@Args('createClassificationInput') createClassificationInput: CreateClassificationInput) {
  //   return this.classificationService.create(createClassificationInput);
  // }

  // @Query(() => [Classification], { name: 'classification' })
  // findAll() {
  //   return this.classificationService.findAll();
  // }

  // @Query(() => Classification, { name: 'classification' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.classificationService.findOne(id);
  // }

  // @Mutation(() => Classification)
  // updateClassification(@Args('updateClassificationInput') updateClassificationInput: UpdateClassificationInput) {
  //   return this.classificationService.update(updateClassificationInput.id, updateClassificationInput);
  // }

  // @Mutation(() => Classification)
  // removeClassification(@Args('id', { type: () => Int }) id: number) {
  //   return this.classificationService.remove(id);
  // }
}
