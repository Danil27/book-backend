import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, ValidateIf } from 'class-validator';

export class UserIdsDto {
  @IsEmail()
  @ValidateIf((data) => !data.username)
  @ApiProperty({
    description: 'User Email',
    nullable: false,
    required: false,
  })
  email?: string;

  @IsNotEmpty()
  @ValidateIf((data) => !data.email)
  @ApiProperty({
    description: 'Name',
    nullable: false,
    required: false,
  })
  name?: string;
}
