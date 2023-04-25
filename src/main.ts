import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { InitialGenres } from './genres/seeders/genre.seeder';
import { InitialAdmins } from './users/seeders/admins.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.get(InitialGenres).initGenre();
  await app.get(InitialAdmins).initGenre();

  SwaggerModule.setup(
    'api/docs',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Book-list documentation')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build(),
    ),
  );

  await app.listen(3000);
}
bootstrap();
