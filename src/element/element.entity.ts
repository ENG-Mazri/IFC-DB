import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Element {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column()
    @Field()
    expressID: number;

    @Column()
    @Field({nullable: true})
    name?: string;

    @Column()
    @Field()
    class: string;

    @Column()
    @Field()
    globalID: string;
}