import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { InitialGenres } from './seeders/genre.seeder';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [InitialGenres],
  exports: [],
})
export class BookModule {}
