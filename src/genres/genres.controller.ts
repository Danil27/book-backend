import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenresService } from './genres.service';

@ApiTags('Genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  @ApiOperation({ summary: 'Get all genre' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  async findAll() {
    return this.genresService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get genre by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  async find(@Param('id') id: number) {
    return this.genresService.findByID(id);
  }
}
