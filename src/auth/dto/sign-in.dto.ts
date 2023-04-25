import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @ApiProperty({
    description: 'User Email',
    nullable: false,
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'User password',
    nullable: false,
    required: true,
  })
  password: string;
}
