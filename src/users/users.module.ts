import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InitialAdmins } from './seeders/admins.seeder';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, InitialAdmins],
  exports: [UsersService],
})
export class UsersModule {}
