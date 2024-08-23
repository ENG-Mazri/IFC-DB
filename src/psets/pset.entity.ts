import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Pset {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  expressID: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  value: string;

  @Column()
  @Field()
  pset: string;
}
