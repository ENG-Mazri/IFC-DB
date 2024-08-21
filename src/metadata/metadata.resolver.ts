import { Mutation, Resolver, Query, Int, Args } from '@nestjs/graphql';
import { MetaData } from './metadata.entity';
import { MetaDataService } from './metadata.service';
import { CreateMetaDataInput } from './dto/create.metadata.input';


@Resolver(of => MetaData)
export class MetadataResolver {
    constructor(private metaDataService: MetaDataService){}
    
    @Query(returns => MetaData)
    async getMetaData(): Promise<MetaData> {
        return this.metaDataService.findOne();
    }

    @Mutation(returns => MetaData)
    async createMetaData(@Args('createMetaDataInput') createMetaDataInput: CreateMetaDataInput): Promise<MetaData>{
        return this.metaDataService.createMetaData(createMetaDataInput);
    }
}
