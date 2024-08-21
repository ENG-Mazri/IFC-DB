import { CreateGeometryInput } from './create-geometry.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGeometryInput extends PartialType(CreateGeometryInput) {
  @Field()
  expressID: number;

  @Field()
  geometryID: number;

  @Field()
  verts: string;

  @Field()
  indices: string;

  @Field()
  matrix: string;

  @Field()
  color: string;
}
