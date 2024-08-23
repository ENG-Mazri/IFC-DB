import { CreatePsetInput } from './create-pset.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePsetInput extends PartialType(CreatePsetInput) {
  @Field()
  expressID: number;

  @Field()
  name: string;

  @Field()
  value: string;

  @Field()
  pset: string;
}
