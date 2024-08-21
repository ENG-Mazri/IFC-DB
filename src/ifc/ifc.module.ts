import { Module } from '@nestjs/common';
import { IfcResolver } from './ifc.resolver';
import { IfcService } from './ifc.service';
import { Ifc } from './ifc.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as WebIFC from "web-ifc";
import {readFileSync} from 'fs';
import { join } from 'path';
import { IfcUtils } from '../logic/IfcUtils';
import { MetaData } from '../metadata/metadata.entity';
import { MetaDataService } from '../metadata/metadata.service';
import { MetadataModule } from '../metadata/metadata.module';


@Module({
  imports: [TypeOrmModule.forFeature([Ifc, MetaData]), MetadataModule],
  providers: [IfcResolver, IfcService, MetaDataService],
  exports: [IfcService]
})
export class IfcModule {
  constructor(private ifcService: IfcService, private metaDataService: MetaDataService){
    this.ifcService.clearDB();
    this.metaDataService.clearDB();
    this.readFile('minimalWall.ifc');
  }

  public async readFile(name: string){
    const ifcRawData = readFileSync( join(__dirname, '../../assets/small-ifc.ifc'));
    const IFCAPI = new WebIFC.IfcAPI(); 
    await IFCAPI.Init();
    IFCAPI.SetWasmPath(join(__dirname,"../../assets/"));
    
    const modelID = IFCAPI.OpenModel(ifcRawData, {COORDINATE_TO_ORIGIN: true});
    const elementIds = IfcUtils.getModelElements(IFCAPI, modelID);
  
    this.metaDataService.createMetaData({
      name,
      schema: IFCAPI.GetModelSchema(modelID),
      description: '',
      organization: '',
      application: '',
      author: '',
      uuid: IfcUtils.generateUUID(),
      elementsCount: elementIds.length 
    })

    for (let i = 0; i < elementIds.length; i++) { 
      const element = IFCAPI.GetLine(modelID, elementIds[i]);
      
      this.ifcService.createElementRecord({
        expressID: element.expressID,
        class: IfcUtils.getNameFromTypeCode(IFCAPI, element.type),
        globalID: element.GlobalId.value,
        name: element.Name?.value ? element.Name?.value : ''
      })
    }
  }
}
