import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PsetsService } from './psets.service';
import { Pset } from './pset.entity';
import { CreatePsetInput } from './dto/create-pset.input';
import { UpdatePsetInput } from './dto/update-pset.input';

@Resolver(() => Pset)
export class PsetsResolver {
  constructor(private readonly psetsService: PsetsService) {}

  // @Mutation(() => Pset)
  // createPset(@Args('createPsetInput') createPsetInput: CreatePsetInput) {
  //   return this.psetsService.create(createPsetInput);
  // }

  // @Query(() => [Pset], { name: 'psets' })
  // findAll() {
  //   return this.psetsService.findAll();
  // }

  // @Query(() => Pset, { name: 'pset' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.psetsService.findOne(id);
  // }

  // @Mutation(() => Pset)
  // updatePset(@Args('updatePsetInput') updatePsetInput: UpdatePsetInput) {
  //   return this.psetsService.update(updatePsetInput.id, updatePsetInput);
  // }

  // @Mutation(() => Pset)
  // removePset(@Args('id', { type: () => Int }) id: number) {
  //   return this.psetsService.remove(id);
  // }
}
