import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ description: 'User Email', nullable: true, required: false })
  email: string;

  @MinLength(3)
  @MaxLength(32)
  @ApiProperty({ description: 'Name', nullable: true, required: false })
  name?: string;

  @MinLength(6)
  @ApiProperty({
    description: 'User password',
    nullable: true,
    required: false,
  })
  password: string;

  @ApiProperty({ description: 'Role', nullable: true, required: false })
  @IsNotEmpty()
  role?: Role;
}
