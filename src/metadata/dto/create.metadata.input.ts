import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateMetaDataInput{
    @Field()
    schema: string;

    @Field()
    name: string;

    @Field({nullable: true})
    description?: string;

    @Field()
    uuid: string;

    @Field({nullable: true})
    organization?: string;

    @Field({nullable: true})
    application?: string;

    @Field({nullable: true})
    author?: string;

    // @Field()
    // elements: string[];

    @Field()
    elementsCount: number;
}