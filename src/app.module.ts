import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { IfcModule } from './ifc/ifc.module';
import { MetadataModule } from './metadata/metadata.module';
import { IfcService } from './ifc/ifc.service';
import { MetaDataService } from './metadata/metadata.service';
import { GeometryModule } from './geometry/geometry.module';
import { MetaData } from './metadata/metadata.entity';
import { Ifc } from './ifc/ifc.entity';
import { GeometryService } from './geometry/geometry.service';
import { Geometry } from './geometry/geometry.entity';

//docker exec -it mysql-24 bash
// @Module({
//   imports: [TypeOrmModule.forRoot({
//     type: "mysql",
//     host: "localhost",
//     port: 3333,
//     username: "root",
//     password: "root",
//     database: "mydb24",
//     entities: [],
//     synchronize: true
//   })],
//   controllers: [AppController],
//   providers: [AppService],
// })

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',//'db.sqlite',
      entities: ['dist/**/*.entity.js'],
      synchronize: true
    }),
    IfcModule,
    MetadataModule,
    GeometryModule,
    TypeOrmModule.forFeature([Ifc, MetaData, Geometry])
  ],
  controllers: [AppController],
  providers: [AppService, IfcService, MetaDataService, GeometryService],
})

export class AppModule {
  constructor(
      private appService: AppService,
      private ifcService: IfcService, 
      private metaDataService: MetaDataService,
      private geometryService: GeometryService
  ){
    this.appService.init(ifcService, metaDataService, geometryService);
  }
  
}
