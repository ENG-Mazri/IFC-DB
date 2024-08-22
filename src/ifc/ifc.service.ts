import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ifc } from './ifc.entity';
import { Repository } from 'typeorm';
import { CreateIfcInput } from './dto/create.ifc.input';

@Injectable()
export class IfcService {
    constructor( @InjectRepository(Ifc) private ifcRepository: Repository<Ifc> ){}

    async createElementRecord(createIfcInput: CreateIfcInput): Promise<Ifc> {
        const element = this.ifcRepository.create(createIfcInput);
        return this.ifcRepository.save(element);
    }

    async findAll(): Promise<Ifc[]>{
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
