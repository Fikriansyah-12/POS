import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
  origin: true,
  credentials: true,
});
  app.use(helmet())
  app.setGlobalPrefix('/api/v1')
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  )
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
