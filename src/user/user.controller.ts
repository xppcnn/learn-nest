import {
  Controller,
  Post,
  Body,
  Inject,
  ValidationPipe,
  Get,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Post('login')
  async login(@Body(ValidationPipe) user: LoginDto) {
    const foundUser = await this.userService.login(user);
    if (foundUser) {
      const access_token = this.jwtService.sign(
        {
          userId: foundUser.id,
          username: foundUser.username,
        },
        {
          expiresIn: '30m',
        },
      );
      const refresh_token = this.jwtService.sign(
        {
          userId: foundUser.id,
        },
        {
          expiresIn: '7d',
        },
      );
      return {
        access_token,
        refresh_token,
      };
    } else {
      return '登录失败';
    }
  }

  @Post('register')
  async register(@Body() user: RegisterDto) {
    return await this.userService.register(user);
  }

  @Get('init')
  async initData() {
    await this.userService.initData();
    return 'done';
  }

  @Get('refresh')
  async refresh(@Query('refresh_token') refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken);
      const user = await this.userService.findUserById(data.userId);
      const access_token = this.jwtService.sign(
        {
          userId: user.id,
          username: user.username,
        },
        {
          expiresIn: '30m',
        },
      );

      const refresh_token = this.jwtService.sign(
        {
          userId: user.id,
        },
        {
          expiresIn: '7d',
        },
      );

      return {
        access_token,
        refresh_token,
      };
    } catch (error) {
      throw new UnauthorizedException('token已失效，请重新登录');
    }
  }
}
