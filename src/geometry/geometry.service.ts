import { Injectable } from '@nestjs/common';
import { CreateGeometryInput } from './dto/create-geometry.input';
import { UpdateGeometryInput } from './dto/update-geometry.input';
import { Geometry } from './geometry.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GeometryService {
  constructor( @InjectRepository(Geometry) private geometryRepository: Repository<Geometry> ){}

  createGeometryRecord(createGeometryInput: CreateGeometryInput) {
    const element = this.geometryRepository.create(createGeometryInput);
    return this.geometryRepository.save(element);
  }

  async findOneByGeometryID(geometryID: number): Promise<Geometry>{
    return this.geometryRepository.findOneOrFail({where: {geometryID}});
  }

  async findAllByExprtessID(expressID: number): Promise<Geometry[]>{
    return this.geometryRepository.findBy({expressID});
  }

  findAll() {
    return this.geometryRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} geometry`;
  // }

  // update(id: number, updateGeometryInput: UpdateGeometryInput) {
  //   return `This action updates a #${id} geometry`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} geometry`;
  // }
}
