import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async importIfc( @UploadedFile() file: Express.Multer.File ) {

    return 'File was sent successfully!'; 
  }
}
