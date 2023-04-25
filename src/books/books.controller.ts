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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
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

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create book' })
  @UseGuards(JwtGuard)
  @ApiBody({ type: CreateBookDto })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalid',
  })
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.booksService.create(createBookDto);
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
  @UseGuards(JwtGuard)
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
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalid',
  })
  async delete(@Param('bookId') bookId: number) {
    return await this.booksService.delete(bookId);
  }
}
