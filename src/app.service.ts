import { Injectable } from '@nestjs/common';
import { IfcService } from './ifc/ifc.service';
import { IfcAPI, FlatMesh, Vector, PlacedGeometry } from 'web-ifc';
import {readFileSync} from 'fs';
import { join } from 'path';
import { IfcUtils } from './logic/IfcUtils';
import { MetaDataService } from './metadata/metadata.service';
import { GeometryService } from './geometry/geometry.service';


@Injectable()
export class AppService {

  private ifcService: IfcService;
  private metaDataService: MetaDataService;
  private geometryservice: GeometryService;
  private IFCAPI: IfcAPI;

  constructor(){
    this.IFCAPI = new IfcAPI(); 
  }

  init(ifcService: IfcService, metaDataService: MetaDataService, geometryservice: GeometryService){
    this.ifcService = ifcService;
    this.metaDataService = metaDataService;
    this.geometryservice = geometryservice;
    this.ifcService.clearDB();
    this.metaDataService.clearDB();
    this.processModel('minimalWall.ifc');
  }

  public async processModel(name: string){
    const ifcRawData = readFileSync( join(__dirname, '../assets/small-ifc.ifc'));
    await this.IFCAPI.Init();
    this.IFCAPI.SetWasmPath(join(__dirname,"../assets/"));
    
    const modelID = this.IFCAPI.OpenModel(ifcRawData, {COORDINATE_TO_ORIGIN: true});
    const elementIds = IfcUtils.getModelElements(this.IFCAPI, modelID);

    this.generateMetaData(name, elementIds.length, modelID);
    this.generateElementsData(elementIds, modelID);

    this.IFCAPI.StreamAllMeshes(modelID, (mesh: FlatMesh, index: number, total: number)=>{
      this.generateGeometry(mesh);
    })
    
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
      
      this.ifcService.createElementRecord({
        expressID: element.expressID,
        class: IfcUtils.getNameFromTypeCode(this.IFCAPI, element.type),
        globalID: element.GlobalId.value,
        name: element.Name?.value ? element.Name?.value : ''
      })
    }
  }

  private generateGeometry(mesh: FlatMesh){
    const geometries = mesh.geometries;
    const size = geometries.size();

  };

  
}
