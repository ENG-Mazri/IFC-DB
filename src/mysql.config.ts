import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class MySQLConfigService implements TypeOrmOptionsFactory {

  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: "localhost",
      port: 3306,
      username: "root",
      password: "my-secret-pw",
      database: this.configService.get<string>('DB_NAME'),
      // type: 'sqlite',
      // database: 'db.sqlite',//':memory:', 
      entities: ['dist/**/*.entity.js'],
      synchronize: true
      // url: this.configService.get<string>('MONGODB_URL'),
      // username: this.configService.get<string>('MONGODB_USER'),
      // password: this.configService.get<string>('MONGODB_PASSWORD'),
    };
  }
}
