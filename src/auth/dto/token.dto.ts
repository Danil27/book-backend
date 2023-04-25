import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({
    description: 'Access token to protected API sections',
    nullable: false,
  })
  access_token: string;
}
