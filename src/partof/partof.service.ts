import { Injectable } from '@nestjs/common';
import { CreatePartofInput } from './dto/create-partof.input';
import { UpdatePartofInput } from './dto/update-partof.input';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Partof } from './partof.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class PartofService {
  constructor( @InjectRepository(Partof) private partofRepository: Repository<Partof>, @InjectEntityManager() private readonly entityManager: EntityManager ){}

  // create(createPartofInput: CreatePartofInput) {
  //   return 'This action adds a new partof';
  // }

  // findAll() {
  //   return `This action returns all partof`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} partof`;
  // }

  // update(id: number, updatePartofInput: UpdatePartofInput) {
  //   return `This action updates a #${id} partof`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} partof`;
  // }
}
