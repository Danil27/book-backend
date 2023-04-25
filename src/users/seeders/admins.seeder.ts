import { Injectable } from '@nestjs/common';
import adminsData from './admin-data.json';
import { UsersService } from '../users.service';
import { Role } from '@prisma/client';

@Injectable()
export class InitialAdmins {
  constructor(private readonly usersService: UsersService) {}

  async initGenre() {
    for (const admin of adminsData) {
      try {
        await this.usersService.create({
          ...admin,
          role: Role.ADMIN,
        });
      } catch (e) {
        continue;
      }
    }
  }
}
