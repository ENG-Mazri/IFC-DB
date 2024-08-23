import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAttributeInput {
  @Field()
  expressID: number;

  @Field()
  name: string;

  @Field()
  value: string;
}
