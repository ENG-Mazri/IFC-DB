import { CreateAttributeInput } from './create-attribute.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAttributeInput extends PartialType(CreateAttributeInput) {
  @Field()
  expressID: number;

  @Field()
  name: string;

  @Field()
  value: string;
}
