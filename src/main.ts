import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { LoggerMiddleware } from './middlewares/logger.middleware';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    rawBody: true,
  });
  await app.listen(3333);
  app.use(LoggerMiddleware);
}
bootstrap();
