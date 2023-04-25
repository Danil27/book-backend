import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    description: 'Book name',
    nullable: false,
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Book edition',
    nullable: false,
    required: true,
  })
  edition: string;

  @ApiProperty({
    description: 'Publication date',
    nullable: false,
    required: true,
  })
  publicationDate: Date;

  @ApiProperty({
    description: 'Author id',
    nullable: false,
    required: true,
  })
  authorIds: number[];

  @ApiProperty({
    description: 'Genre id',
    nullable: false,
    required: true,
  })
  genreIds: number[];

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File
}
