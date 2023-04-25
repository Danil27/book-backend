import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BooksService {
  private readonly api_url;

  constructor(
    private readonly prismaService: PrismaService,
    private configService: ConfigService,
  ) {
    this.api_url = this.configService.get('api_url');
  }

  public async create(data: CreateBookDto, fileName: string) {
    const { authorIds, edition, genreIds, name, publicationDate } = data;

    return await this.prismaService.book.create({
      data: {
        edition,
        name,
        publicationDate,
        link: this.api_url + 'public' + fileName,
        author: {
          connect: authorIds.split(',').map((id) => ({ id: +id })),
        },
        genre: {
          connect: genreIds.split(',').map((id) => ({ id: +id })),
        },
      },
    });
  }

  public async findById(id: number) {
    return this.prismaService.book.findFirst({
      where: { id: +id },
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
        where: { id: +bookId },
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
      where: { id: +id },
    });
  }
}
