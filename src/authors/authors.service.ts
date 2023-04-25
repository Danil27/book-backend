import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(data: CreateAuthorDto) {
    const { name, dateOfBirth } = data;
    return await this.prismaService.author.create({
      data: {
        name,
        dateOfBirth,
      },
    });
  }

  public async findById(id: number) {
    return this.prismaService.author.findFirst({
      where: {
        id,
      },
    });
  }

  public async findAll(name?: string, skip?: number, limit?: number) {
    return this.prismaService.author.findMany({
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

  public async update(authorId: number, author: UpdateAuthorDto) {
    const { name, dateOfBirth } = author;
    try {
      return this.prismaService.author.update({
        where: { id: authorId },
        data: {
          name,
          dateOfBirth,
        },
        select: {
          name: true,
          dateOfBirth: true,
        },
      });
    } catch (e) {
      return new BadRequestException();
    }
  }

  public async delete(id: number) {
    return this.prismaService.author.delete({
      where: { id },
    });
  }
}
