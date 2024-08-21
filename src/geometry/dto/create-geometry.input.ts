import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGeometryInput {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // exampleField: number;
  @Field()
  expressID: number;

  @Field()
  geometryID: number;

  @Field()
  verts: string;

  @Field()
  indices: string;
}
