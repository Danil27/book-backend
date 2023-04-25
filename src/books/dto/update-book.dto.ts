import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiProperty({
    description: 'Book name',
    nullable: true,
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Book edition',
    nullable: true,
    required: false,
  })
  edition?: string;

  @ApiProperty({
    description: 'Publication date',
    nullable: true,
    required: false,
  })
  publicationDate?: Date;

  @ApiProperty({
    description: 'Author id',
    nullable: true,
    required: false,
  })
  authorIds?: number[];

  @ApiProperty({
    description: 'Genre id',
    nullable: true,
    required: false,
  })
  genreIds?: number[];
}
