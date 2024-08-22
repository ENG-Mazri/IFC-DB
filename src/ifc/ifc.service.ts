import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Ifc } from './ifc.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateIfcInput } from './dto/create.ifc.input';
import { DbSwitch } from 'src/middlewares/DbSwitch.middleware';

@Injectable()
export class IfcService {
    constructor( @InjectRepository(Ifc) private ifcRepository: Repository<Ifc>, @InjectEntityManager() private readonly entityManager: EntityManager ){}

    async createElementRecord(createIfcInput: CreateIfcInput): Promise<Ifc> {
        const element = this.ifcRepository.create(createIfcInput);
        return this.ifcRepository.save(element);
    }

    async findAll(): Promise<Ifc[]>{
        //TODO:: Switch to DB by modelID
        await DbSwitch(this.entityManager.connection, 'smallifc');
        return this.ifcRepository.find();
    }

    async findOneByExprtessID(expressID: number): Promise<Ifc> {
        return this.ifcRepository.findOneOrFail({where: {expressID}});
    }

    async findAllByClass(className: string): Promise<Ifc[]>{
        return this.ifcRepository.findBy({class: className});
    }

    async clearDB(): Promise<void>{
        return this.ifcRepository.clear();
    }
}
