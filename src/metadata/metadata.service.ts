import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { MetaData } from './metadata.entity';
import { CreateMetaDataInput } from './dto/create.metadata.input';
import { DbSwitch } from 'src/middlewares/DbSwitch.middleware';

@Injectable()
export class MetaDataService {
    constructor( @InjectRepository(MetaData) private metaDataRepository: Repository<MetaData>, @InjectEntityManager() private readonly entityManager: EntityManager ){}

    async createMetaData(createIfcInput: CreateMetaDataInput): Promise<MetaData> {
        const newIfc = this.metaDataRepository.create(createIfcInput);
        return this.metaDataRepository.save(newIfc);
    }

    async findOne(): Promise<MetaData>{
        //TODO:: Switch to DB by modelID
        await DbSwitch(this.entityManager.connection, 'smallifc');
        return this.metaDataRepository.findOneOrFail({where: {id: 1}});
    }

    async clearDB(): Promise<void>{
        return this.metaDataRepository.clear();
    }
}
