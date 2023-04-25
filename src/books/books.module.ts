import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BooksService } from './books.service';
import { BookController } from './books.controller';

@Module({
  imports: [PrismaModule],
  controllers: [BookController],
  providers: [BooksService],
  exports: [],
})
export class BookModule {}
