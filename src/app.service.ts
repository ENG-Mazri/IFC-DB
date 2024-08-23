import { Injectable } from '@nestjs/common';
import { ElementService } from './element/element.service';
import { IfcAPI, FlatMesh } from 'web-ifc';
import {readFileSync} from 'fs';
import { join } from 'path';
import { IfcUtils } from './logic/IfcUtils';
import { MetaDataService } from './metadata/metadata.service';
import { GeometryService } from './geometry/geometry.service';
import { ConfigService } from '@nestjs/config';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Element } from './element/element.entity';
import { DbSwitch } from './middlewares/DbSwitch.middleware';


@Injectable()
export class AppService {

  private elementService: ElementService;
  private metaDataService: MetaDataService;
  private geometryservice: GeometryService;
  private IFCAPI: IfcAPI;

  constructor(   
    @InjectEntityManager()
    private readonly entityManager: EntityManager
  ){
    this.IFCAPI = new IfcAPI(); 
  }

  async init(elementService: ElementService, metaDataService: MetaDataService, geometryservice: GeometryService, configService: ConfigService){
    this.metaDataService = metaDataService;
    this.elementService = elementService;
    this.geometryservice = geometryservice;
    const database = "walltest"; 

    await DbSwitch(this.entityManager.connection, database, true);
    await this.processModel('wallTest.ifc');
  }

  public async processModel(name: string){
    const ifcRawData = readFileSync( join(__dirname, '../assets/wallTest.ifc'));
    await this.IFCAPI.Init();
    this.IFCAPI.SetWasmPath(join(__dirname,"../assets/"));
    
    const modelID = this.IFCAPI.OpenModel(ifcRawData, {COORDINATE_TO_ORIGIN: true});
    const elementIds = IfcUtils.getModelElements(this.IFCAPI, modelID);

    this.generateMetaData(name, elementIds.length, modelID);
    this.generateElementsData(elementIds, modelID);

    // this.IFCAPI.StreamAllMeshes(modelID, (mesh: FlatMesh, index: number, total: number)=>{ 
    //   this.generateGeometry(mesh);
    // })
    
  }

  private generateMetaData(name: string, elementIdsCount: number, modelID: number = 0): void {
    this.metaDataService.createMetaData({
      name,
      schema: this.IFCAPI.GetModelSchema(modelID),
      description: '',
      organization: '',
      application: '',
      author: '',
      uuid: IfcUtils.generateUUID(),
      elementsCount: elementIdsCount
    })
  }

  private generateElementsData(elementIds: number[], modelID: number = 0): void {
    for (let i = 0; i < elementIds.length; i++) { 
      const element = this.IFCAPI.GetLine(modelID, elementIds[i]);

      this.elementService.createElementRecord({
        expressID: element.expressID,
        class: IfcUtils.getNameFromTypeCode(this.IFCAPI, element.type),
        globalID: element.GlobalId.value,
        name: element.Name?.value ? element.Name?.value : ''
      }) 
    }
  }

  private generateGeometry(mesh: FlatMesh, modelID: number = 0){
    const geometries = mesh.geometries;
    const size = geometries.size();

    for (let i = 0; i < size; i++) {
      const placedGeometry = geometries.get(i);
      const {verts, indices} = this.getGeometryData(modelID, placedGeometry.geometryExpressID);
      this.geometryservice.createGeometryRecord({
        expressID: mesh.expressID,
        geometryID: placedGeometry.geometryExpressID,
        verts,
        indices,
        matrix: JSON.stringify(placedGeometry.flatTransformation),
        color: JSON.stringify(placedGeometry.color)
      })

    }
  }

  getGeometryData(modelID: any, geometryID: number) {
    
    const geometry = this.IFCAPI.GetGeometry(modelID, geometryID);
    const verts = JSON.stringify(Array.from(this.IFCAPI.GetVertexArray(geometry.GetVertexData(), geometry.GetVertexDataSize())));
    const indices = JSON.stringify(Array.from(this.IFCAPI.GetIndexArray(geometry.GetIndexData(), geometry.GetIndexDataSize())));

    //DEBUG
    // const decoder = new TextDecoder('utf-8');
    // const r = JSON.parse(decoder.decode(Buffer.from(verts)));

    //@ts-ignore
    geometry.delete();
    return {verts, indices};
  }
 
}