import {
  Body,
  Controller,
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
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorsService } from './authors.service';
import { FindAuthorDto } from './dto/find-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { IsAdminGuard } from '../common/guards/is-admin.guard';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create author' })
  @UseGuards(JwtGuard, IsAdminGuard)
  @ApiBody({ type: CreateAuthorDto })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalid',
  })
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    return await this.authorsService.create(createAuthorDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get author by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Author not found by id',
  })
  async findByID(@Param('id') id: number) {
    const authorById = await this.authorsService.findById(+id);

    if (!authorById) {
      throw new HttpException('Author not found by id', HttpStatus.NOT_FOUND);
    }

    return authorById;
  }

  @Get('')
  @ApiOperation({ summary: 'Get all authors with filter and pagination' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  async getList(@Query() queryParams: FindAuthorDto) {
    return this.authorsService.findAll(
      queryParams.name,
      +queryParams.skip,
      +queryParams.limit,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update author' })
  @UseGuards(JwtGuard, IsAdminGuard)
  @ApiBody({ type: UpdateAuthorDto })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalid',
  })
  async update(
    @Body() updateAuthorDto: UpdateAuthorDto,
    @Param('id') authorId: number,
  ) {
    return await this.authorsService.update(+authorId, updateAuthorDto);
  }
}
