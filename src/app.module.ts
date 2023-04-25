import { Module } from '@nestjs/common';
import { BookModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthorModule } from './authors/authors.module';
import { GenresModule } from './genres/gentes.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    BookModule,
    UsersModule,
    AuthModule,
    GenresModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthorModule,
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
