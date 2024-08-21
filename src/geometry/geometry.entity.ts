import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Geometry {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // exampleField: number;
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  expressID: number;

  @Column()
  @Field()
  geometryID: number;

  @Column()
  @Field()
  verts: string;

  @Column()
  @Field()
  indices: string;

  @Column()
  @Field()
  matrix: string;

  @Column()
  @Field()
  color: string;
}
