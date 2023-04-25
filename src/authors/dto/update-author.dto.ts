import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthorDto {
  @ApiProperty({
    description: 'Author name',
    nullable: true,
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Date of birth',
    nullable: true,
    required: false,
  })
  dateOfBirth?: Date;
}
