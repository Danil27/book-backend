import { Injectable } from '@nestjs/common';
import genresData from './genre-data.json';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class InitialGenres {
  constructor(private readonly prismaService: PrismaService) {}

  async initGenre() {
    if (
      genresData.length !== (await this.prismaService.genre.findMany()).length
    ) {
      await this.prismaService.genre.deleteMany({});
    }

    for (const genre of genresData) {
      try {
        await this.prismaService.genre.upsert({
          where: {
            id: genre.id,
          },
          update: {},
          create: {
            ...genre,
          },
        });
      } catch (e) {
        throw new Error(`Error create genre. ${e}`);
      }
    }
  }
}
