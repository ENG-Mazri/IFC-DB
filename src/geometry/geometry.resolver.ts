import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GeometryService } from './geometry.service';
import { Geometry } from './geometry.entity';
import { CreateGeometryInput } from './dto/create-geometry.input';
import { UpdateGeometryInput } from './dto/update-geometry.input';

@Resolver(() => Geometry)
export class GeometryResolver {
  constructor(private readonly geometryService: GeometryService) {}
    
  @Query(returns => [Geometry])
  async getGeometries(): Promise<Geometry[]> {
      return this.geometryService.findAll();
  }

  @Query(returns => Geometry)
  async getGeometryByGeometryID(@Args('geometryID', {type: () => Int} ) id: number): Promise<Geometry> {
      return this.geometryService.findOneByGeometryID(id);
  }

  @Query(returns => [Geometry])
  async getElementGeometriesByExpressId(@Args('expressID', {type: () => Int} ) expressID: number): Promise<Geometry[]> {
      return this.geometryService.findAllByExprtessID(expressID);
  }

  @Mutation(returns => Geometry)
  async createGeometry(@Args('createGeometryInput') createGeometryInput: CreateGeometryInput): Promise<Geometry>{
      return this.geometryService.createGeometryRecord(createGeometryInput);
  }

  // @Mutation(() => Geometry)
  // createGeometry(@Args('createGeometryInput') createGeometryInput: CreateGeometryInput) {
  //   return this.geometryService.create(createGeometryInput);
  // }

  // @Query(() => [Geometry], { name: 'geometry' })
  // findAll() {
  //   return this.geometryService.findAll();
  // }

  // @Query(() => Geometry, { name: 'geometry' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.geometryService.findOne(id);
  // }

  // @Mutation(() => Geometry)
  // updateGeometry(@Args('updateGeometryInput') updateGeometryInput: UpdateGeometryInput) {
  //   return this.geometryService.update(updateGeometryInput.id, updateGeometryInput);
  // }

  // @Mutation(() => Geometry)
  // removeGeometry(@Args('id', { type: () => Int }) id: number) {
  //   return this.geometryService.remove(id);
  // }
}
