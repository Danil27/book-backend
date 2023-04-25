import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    nullable: false,
    required: true,
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'User name',
    nullable: true,
    required: false,
  })
  name?: string;

  @MinLength(6)
  @ApiProperty({
    description: 'User password',
    nullable: false,
    required: true,
  })
  password: string;
}
