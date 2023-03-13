import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // vamos utilizar os pipes de validação
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  // definindo o container de injeção de dependencia para o class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);
}
bootstrap();
