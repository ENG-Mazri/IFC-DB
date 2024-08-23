import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Partof {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  expressID: number;

  @Column()
  @Field()
  relation: string;

  @Column()
  @Field()
  parent_expressID: number;
}
