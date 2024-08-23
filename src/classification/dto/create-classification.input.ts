import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateClassificationInput {
  @Field()
  expressID: number;

  @Field()
  system: string;

  @Field()
  value: string;
}
