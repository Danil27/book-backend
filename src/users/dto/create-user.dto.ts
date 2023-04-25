import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength, ValidateIf } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ValidateIf((data) => !data.googleId)
  @ApiProperty({ description: 'User Email', nullable: true, required: false })
  email?: string;

  @MinLength(3)
  @MaxLength(32)
  @ValidateIf((data) => !data.googleId)
  @ApiProperty({ description: 'Name', nullable: true, required: false })
  name?: string;

  @MinLength(6)
  @ValidateIf((data) => !data.googleId)
  @ApiProperty({
    description: 'User password',
    nullable: true,
    required: false,
  })
  password?: string;
}
