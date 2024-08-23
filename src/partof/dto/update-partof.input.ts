import { CreatePartofInput } from './create-partof.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePartofInput extends PartialType(CreatePartofInput) {
  @Field()
  expressID: number;

  @Field()
  relation: string;

  @Field()
  parent_expressID: number;
}
