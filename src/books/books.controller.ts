import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
import { FindBookDto } from './dto/find-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { IsAdminGuard } from '../common/guards/is-admin.guard';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create book' })
  @UseGuards(JwtGuard, IsAdminGuard)
  @ApiBody({ type: CreateBookDto })
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '..', '..', '/public'),
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalid',
  })
  async create(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return await this.booksService.create(createBookDto, file.originalname);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get book by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Book not found by id',
  })
  async findByID(@Param('id') id: number) {
    const bookById = await this.booksService.findById(id);

    if (!bookById) {
      throw new HttpException('Book not found by id', HttpStatus.NOT_FOUND);
    }

    return bookById;
  }

  @Get('')
  @ApiOperation({ summary: 'Get all books with filter and pagination' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  async getList(@Query() queryParams: FindBookDto) {
    return this.booksService.findAll(
      queryParams.name,
      +queryParams.skip,
      +queryParams.limit,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update book' })
  @UseGuards(JwtGuard, IsAdminGuard)
  @ApiBody({ type: UpdateBookDto })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalid',
  })
  async update(
    @Body() updateBookDto: UpdateBookDto,
    @Param('id') bookId: number,
  ) {
    return await this.booksService.update(bookId, updateBookDto);
  }

  @Delete(':bookId')
  @ApiOperation({ summary: 'Delete book' })
  @UseGuards(JwtGuard, IsAdminGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalid',
  })
  async delete(@Param('bookId') bookId: number) {
    return await this.booksService.delete(bookId);
  }
}
