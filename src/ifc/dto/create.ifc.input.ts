import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateIfcInput{
    @Field()
    expressID: number;

    @Field()
    name: string;

    @Field()
    class: string;

    @Field()
    globalID: string;
}