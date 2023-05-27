import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, Request, Response } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:19006',
  });
  
  app.use((req: Request, res: Response, next: () => void) => {
    logger.log(`${req.method} ${req.url}`);
    next();
  });

  await app.listen(3000);
}
bootstrap();
