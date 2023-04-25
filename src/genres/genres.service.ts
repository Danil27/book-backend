import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GenresService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findByID(id: number) {
    return this.prismaService.genre.findFirst({
      where: { id },
    });
  }

  public async findAll() {
    return this.prismaService.genre.findMany();
  }
}
