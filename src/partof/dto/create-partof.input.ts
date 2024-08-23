import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePartofInput {
  @Field()
  expressID: number;

  @Field()
  relation: string;

  @Field()
  parent_expressID: number;
}
