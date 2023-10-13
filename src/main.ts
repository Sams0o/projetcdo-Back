import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ajoute le préfixe api à l'adresse localhost:3000
  app.setGlobalPrefix('api');

  // Indique à Nestjs qu'il va devoir checker les entrées avec class-validator
  app.useGlobalPipes(new ValidationPipe());

  //  Swagger
  const config = new DocumentBuilder()
    .setTitle('cdo')
    .setDescription('Swagger cdo')
    .setVersion('1.0')
    .addTag('tags')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  //  Permet d'utiliser cors pour lier front et back
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
