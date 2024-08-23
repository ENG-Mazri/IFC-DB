import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePsetInput {
  @Field()
  expressID: number;

  @Field()
  name: string;

  @Field()
  value: string;

  @Field()
  pset: string;
}
