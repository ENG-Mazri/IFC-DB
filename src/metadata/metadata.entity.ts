import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class MetaData {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column()
    @Field()
    schema: string;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field({nullable: true})
    description?: string;

    @Column()
    @Field()
    uuid: string;

    @Column()
    @Field({nullable: true})
    organization?: string;

    @Column()
    @Field({nullable: true})
    application?: string;

    @Column()
    @Field({nullable: true})
    author?: string;

    // @Column()
    // @Field()
    // elements: string[];

    @Column()
    @Field()
    elementsCount: number;
}