import { Mutation, Resolver, Query, Int, Args } from '@nestjs/graphql';
import { Ifc } from './ifc.entity';
import { IfcService } from './ifc.service';
import { CreateIfcInput } from './dto/create.ifc.input';

@Resolver(of => Ifc)
export class IfcResolver {
    constructor(private ifcService: IfcService){}
    
    @Query(returns => [Ifc])
    async getElements(): Promise<Ifc[]> {
        return this.ifcService.findAll();
    }

    @Query(returns => Ifc)
    async getElementByExpressID(@Args('expressID', {type: () => Int} ) id: number): Promise<Ifc> {
        return this.ifcService.findOneByExprtessID(id);
    }

    @Query(returns => [Ifc])
    async getElementsByClass(@Args('class', {type: () => String} ) className: string): Promise<Ifc[]> {
        return this.ifcService.findAllByClass(className);
    }

    @Mutation(returns => Ifc)
    async createIfc(@Args('createIfcInput') createIfcInput: CreateIfcInput): Promise<Ifc>{
        return this.ifcService.createElementRecord(createIfcInput);
    }
}
