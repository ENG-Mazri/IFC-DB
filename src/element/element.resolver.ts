import { Mutation, Resolver, Query, Int, Args } from '@nestjs/graphql';
import { Element } from './element.entity';
import { ElementService } from './element.service';
import { CreateElementInput } from './dto/create.element.input';

@Resolver(of => Element)
export class ElementResolver {
    constructor(private elementService: ElementService){}
    
    @Query(returns => [Element])
    async getElements(): Promise<Element[]> {
        return this.elementService.findAll();
    }

    @Query(returns => Element)
    async getElementByExpressID(@Args('expressID', {type: () => Int} ) id: number): Promise<Element> {
        return this.elementService.findOneByExpressID(id);
    }

    @Query(returns => [Element])
    async getElementsByClass(@Args('class', {type: () => String} ) className: string): Promise<Element[]> {
        return this.elementService.findAllByClass(className);
    }

    @Mutation(returns => Element)
    async createElement(@Args('createElementInput') createElementInput: CreateElementInput): Promise<Element>{
        return this.elementService.createElementRecord(createElementInput);
    }
}
