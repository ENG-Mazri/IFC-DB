import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetaData } from './metadata.entity';
import { CreateMetaDataInput } from './dto/create.metadata.input';

@Injectable()
export class MetaDataService {
    constructor( @InjectRepository(MetaData) private metaDataRepository: Repository<MetaData> ){}

    async createMetaData(createIfcInput: CreateMetaDataInput): Promise<MetaData> {
        const newIfc = this.metaDataRepository.create(createIfcInput);
        return this.metaDataRepository.save(newIfc);
    }

    async findOne(): Promise<MetaData>{
        return this.metaDataRepository.findOneOrFail({where: {id: 1}});
    }

    async clearDB(): Promise<void>{
        return this.metaDataRepository.clear();
    }
}
