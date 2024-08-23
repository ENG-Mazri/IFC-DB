import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Element } from './element.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateElementInput } from './dto/create.element.input';
import { DbSwitch } from 'src/middlewares/DbSwitch.middleware';

@Injectable()
export class ElementService {
    constructor( @InjectRepository(Element) private elementRepository: Repository<Element>, @InjectEntityManager() private readonly entityManager: EntityManager ){}

    async createElementRecord(createElementInput: CreateElementInput): Promise<Element> {
        const element = this.elementRepository.create(createElementInput);
        return this.elementRepository.save(element);
    }

    async findAll(): Promise<Element[]>{
        //TODO:: Switch to DB by modelID
        await DbSwitch(this.entityManager.connection, 'smallifc');
        return this.elementRepository.find();
    }

    async findOneByExpressID(expressID: number): Promise<Element> {
        return this.elementRepository.findOneOrFail({where: {expressID}});
    }

    async findAllByClass(className: string): Promise<Element[]>{
        return this.elementRepository.findBy({class: className});
    }

    async clearDB(): Promise<void>{
        return this.elementRepository.clear();
    }
}
