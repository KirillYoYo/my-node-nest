import {
  Controller,
  Post,
  Request,
  UseGuards,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UsersService } from '../users/users.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  @UseInterceptors(AnyFilesInterceptor())
  async register(@Body() body: any) {
    return this.usersService.create(body.email, body.password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    const payload = await this.authService.verifyRefreshToken(refreshToken);
    console.log('send new token');
    return this.authService.generateTokens(payload);
  }
}
