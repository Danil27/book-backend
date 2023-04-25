import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(data: CreateBookDto) {
    const { authorIds, edition, genreIds, name, publicationDate } = data;
    return await this.prismaService.book.create({
      data: {
        edition,
        name,
        publicationDate,
        author: {
          connect: authorIds.map((id) => ({ id })),
        },
        genre: {
          connect: genreIds.map((id) => ({ id })),
        },
      },
    });
  }

  public async findById(id: number) {
    return this.prismaService.book.findFirst({
      where: {
        id,
      },
    });
  }

  public async findAll(name?: string, skip?: number, limit?: number) {
    return this.prismaService.book.findMany({
      where: name
        ? {
            name: {
              contains: name,
              mode: 'insensitive',
            },
          }
        : {},
      skip: isNaN(skip) ? 0 : skip,
      take: isNaN(limit) ? 20 : limit,
    });
  }

  public async update(bookId: number, book: UpdateBookDto) {
    const { name, authorIds, edition, genreIds, publicationDate } = book;
    try {
      return this.prismaService.book.update({
        where: { id: bookId },
        data: {
          name,
          author: {
            connect: authorIds.map((id) => ({ id })),
          },
          genre: {
            connect: genreIds.map((id) => ({ id })),
          },
          edition,
          publicationDate,
        },
        select: {
          name: true,
          author: true,
          genre: true,
          edition: true,
          publicationDate: true,
        },
      });
    } catch (e) {
      return new BadRequestException();
    }
  }

  public async delete(id: number) {
    return this.prismaService.book.delete({
      where: { id },
    });
  }
}
