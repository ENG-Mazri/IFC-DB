import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class MySQLConfigService implements TypeOrmOptionsFactory {

  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      // manualInitialization: true,
      type: 'mysql',
      host: "localhost",
      port: 3306,
      username: "root",
      password: "my-secret-pw",
      database: this.configService.get<string>('DB_NAME'),
      entities: ['dist/**/*.entity.js'],
      name: 'ifc-connection',
      synchronize: true,
      // poolErrorHandler: async (err) => {
      //   Logger.error(err);
      //   const retryDelayMs = 1000;
      //   const reconnection = setInterval(async () => {
      //     Logger.log(
      //       `DB Connection lost. Retry every ${retryDelayMs}ms...`,
      //     );
      //     const datasource = new DataSource(databaseOptions);
      //     const db = await datasource.initialize();
      //     if (db && db.isInitialized) {
      //       Logger.log('Connection restored.');
      //       clearInterval(reconnection);
      //     }
      //   }, retryDelayMs);
      // },
      // type: 'sqlite',
      // database: 'db.sqlite',//':memory:', 
      // url: this.configService.get<string>('MONGODB_URL'),
      // username: this.configService.get<string>('MONGODB_USER'),
      // password: this.configService.get<string>('MONGODB_PASSWORD'),
    };
  }
}
