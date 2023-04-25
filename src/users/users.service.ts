import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

export const DEFAULT_USER_SELECT_FIELDS: Prisma.UserSelect = {
  id: true,
  name: true,
  email: true,
};

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createUserDto: CreateUserDto,
    additionalUserSelectFields: Prisma.UserSelect = {},
  ) {
    const { email, name, password } = createUserDto;
    if (!!(await this.findByEmail(email)))
      throw new HttpException(
        'User with such email already exists',
        HttpStatus.FORBIDDEN,
      );

    return await this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        password: password ? await bcrypt.hash(password, 12) : undefined,
        name,
      },
      select: {
        ...DEFAULT_USER_SELECT_FIELDS,
        ...additionalUserSelectFields,
      },
    });
  }

  async findByEmail(
    email: string,
    additionalUserSelectFields: Prisma.UserSelect = {},
  ) {
    return this.prismaService.user.findFirst({
      select: {
        ...DEFAULT_USER_SELECT_FIELDS,
        ...additionalUserSelectFields,
      },
      where: { email },
    });
  }

  public async findByID(
    userId: string,
    additionalUserSelectFields: Prisma.UserSelect = {},
  ) {
    return this.prismaService.user.findFirst({
      select: {
        ...DEFAULT_USER_SELECT_FIELDS,
        ...additionalUserSelectFields,
      },
      where: { id: userId },
    });
  }
}
