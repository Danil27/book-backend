import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { TokenDto } from './dto/token.dto';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'Registers a user' })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: TokenDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User with such email already exists',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'email must be an email',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'password must be longer than or equal to 6 characters',
  })
  async signUp(@Body() signUpDto: SignUpDto): Promise<TokenDto> {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  @ApiOperation({ summary: 'Authorizes user' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: TokenDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No user with such authorization data was found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password was entered incorrectly',
  })
  async signIn(@Body() signInDto: SignInDto): Promise<TokenDto> {
    return this.authService.signIn(signInDto);
  }
}
