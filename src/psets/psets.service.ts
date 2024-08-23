import { Injectable } from '@nestjs/common';
import { CreatePsetInput } from './dto/create-pset.input';
import { UpdatePsetInput } from './dto/update-pset.input';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Pset } from './pset.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class PsetsService {
  constructor( @InjectRepository(Pset) private psetRepository: Repository<Pset>, @InjectEntityManager() private readonly entityManager: EntityManager ){}

  // create(createPsetInput: CreatePsetInput) {
  //   return 'This action adds a new pset';
  // }

  // findAll() {
  //   return `This action returns all psets`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} pset`;
  // }

  // update(id: number, updatePsetInput: UpdatePsetInput) {
  //   return `This action updates a #${id} pset`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} pset`;
  // }
}
