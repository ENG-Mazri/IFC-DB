import { Injectable } from '@nestjs/common';
import { CreateAttributeInput } from './dto/create-attribute.input';
import { UpdateAttributeInput } from './dto/update-attribute.input';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Attribute } from './attribute.entity';
import { DbSwitch } from 'src/middlewares/DbSwitch.middleware';

@Injectable()
export class AttributesService {
  constructor( @InjectRepository(Attribute) private attributeRepository: Repository<Attribute>, @InjectEntityManager() private readonly entityManager: EntityManager ){}

  async createAttributeRecord(createAttributeInput: CreateAttributeInput): Promise<Attribute> {
    const attribute = this.attributeRepository.create(createAttributeInput);
    return this.attributeRepository.save(attribute);
  }

  async findAll(): Promise<Attribute[]>{
    //TODO:: Switch to DB by modelID
    // await DbSwitch(this.entityManager.connection, 'smallifc');
    return this.attributeRepository.find();
  }

  // async findOneByExpressID(expressID: number): Promise<Attribute> {
  //   return this.attributeRepository.findOneOrFail({where: {expressID}});
  // }

  // async findAllByClass(className: string): Promise<Attribute[]>{
  //   return this.attributeRepository.findBy({class: className});
  // }

  // async clearDB(): Promise<void>{
  //   return this.attributeRepository.clear();
  // }
}
