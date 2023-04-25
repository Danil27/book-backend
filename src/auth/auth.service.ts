import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { TokenDto } from './dto/token.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  private readonly jwt_secret;
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    this.jwt_secret = this.configService.get('jwt_secret');
  }

  public async signUp(signUpDto: SignUpDto): Promise<TokenDto> {
    const { id, role } = await this.usersService.create({
      ...signUpDto,
    });

    return this.generateTokens({ id, role });
  }

  public verifyToken(token: string): JwtPayloadDto | any {
    return this.jwtService.verify(token, {
      secret: this.jwt_secret,
    });
  }

  private generateTokens(payload: JwtPayloadDto): TokenDto {
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.jwt_secret,
        expiresIn: '24h',
      }),
    };
  }

  public async signIn(signInDto: SignInDto): Promise<TokenDto> {
    const user = await this.usersService.findByEmail(signInDto.email, {
      password: true,
    });

    if (!user)
      throw new HttpException(
        'No user with such authorization data was found',
        HttpStatus.NOT_FOUND,
      );

    if (!(await bcrypt.compare(signInDto.password, user.password)))
      throw new HttpException(
        'Password was entered incorrectly',
        HttpStatus.UNAUTHORIZED,
      );

    return this.generateTokens({
      id: user.id,
      role: user.role,
    });
  }
}
