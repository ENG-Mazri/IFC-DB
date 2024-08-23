import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PartofService } from './partof.service';
import { Partof } from './partof.entity';
import { CreatePartofInput } from './dto/create-partof.input';
import { UpdatePartofInput } from './dto/update-partof.input';

@Resolver(() => Partof)
export class PartofResolver {
  constructor(private readonly partofService: PartofService) {}

  // @Mutation(() => Partof)
  // createPartof(@Args('createPartofInput') createPartofInput: CreatePartofInput) {
  //   return this.partofService.create(createPartofInput);
  // }

  // @Query(() => [Partof], { name: 'partof' })
  // findAll() {
  //   return this.partofService.findAll();
  // }

  // @Query(() => Partof, { name: 'partof' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.partofService.findOne(id);
  // }

  // @Mutation(() => Partof)
  // updatePartof(@Args('updatePartofInput') updatePartofInput: UpdatePartofInput) {
  //   return this.partofService.update(updatePartofInput.id, updatePartofInput);
  // }

  // @Mutation(() => Partof)
  // removePartof(@Args('id', { type: () => Int }) id: number) {
  //   return this.partofService.remove(id);
  // }
}
