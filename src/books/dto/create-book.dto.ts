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
    default: new Date(),
  })
  publicationDate: Date;

  @ApiProperty({
    description: 'Author id',
    nullable: false,
    required: true,
  })
  authorIds: string;

  @ApiProperty({
    description: 'Genre id',
    nullable: false,
    required: true,
  })
  genreIds: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;
}
