import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { InitialGenres } from './seeders/genre.seeder';

@Module({
  imports: [PrismaModule],
  controllers: [GenresController],
  providers: [GenresService, InitialGenres],
  exports: [],
})
export class GenresModule {}
