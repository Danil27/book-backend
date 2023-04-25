import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindAuthorDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    type: String,
  })
  name?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    nullable: true,
    type: Number,
    default: 0,
  })
  skip?: number;

  @IsOptional()
  @ApiProperty({
    required: false,
    type: Number,
    default: 20,
  })
  limit?: number;
}
