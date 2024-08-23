import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ElementModule } from './element/element.module';
import { MetadataModule } from './metadata/metadata.module';
import { ElementService } from './element/element.service';
import { MetaDataService } from './metadata/metadata.service';
import { GeometryModule } from './geometry/geometry.module';
import { MetaData } from './metadata/metadata.entity';
import { Element } from './element/element.entity';
import { GeometryService } from './geometry/geometry.service';
import { Geometry } from './geometry/geometry.entity';
import { MySQLConfigService } from './mysql.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';


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
    ConfigModule.forRoot({
      isGlobal: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRootAsync({
      useClass: MySQLConfigService,
      inject: [MySQLConfigService]
    }),
    // TypeOrmModule.forRoot({
    //   manualInitialization: true,
    //   type: 'mysql',
    //   host: "localhost",
    //   port: 3306,
    //   username: "root",
    //   password: "my-secret-pw",
    //   entities: ['dist/**/*.entity.js'],
    //   name: 'alternative'
    // }),
    ElementModule,
    MetadataModule,
    GeometryModule,
    TypeOrmModule.forFeature([Element, MetaData, Geometry])
  ],
  controllers: [AppController],
  providers: [AppService, MySQLConfigService, ElementService, MetaDataService, GeometryService, ConfigService],
})

export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(LoggerMiddleware)
      
  // }
  constructor(
      private appService: AppService,
      private elementService: ElementService, 
      private metaDataService: MetaDataService,
      private geometryService: GeometryService,
      private configService: ConfigService
  ){
    this.appService.init(elementService, metaDataService, geometryService, configService);
  }
  
}
