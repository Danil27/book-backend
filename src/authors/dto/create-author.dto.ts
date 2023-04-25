import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty({
    description: 'Author name',
    nullable: false,
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Date of birth',
    nullable: false,
    required: true,
  })
  dateOfBirth: Date;
}
