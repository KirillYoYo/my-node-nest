import {
  Controller,
  Post,
  Body,
  Inject,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AUTH_SERVICE } from '../../servicesNames';
import { ClientProxy } from '@nestjs/microservices';
import { LOGIN_MS, REGISTER_MS } from '@src/messagesMS';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectConnection() readonly connection: Connection,
    @Inject(AUTH_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post('register')
  async register(
    @Body() body: { email: string; password: string; username: string },
  ) {
    const response = await firstValueFrom(
      this.client.send({ cmd: REGISTER_MS }, body),
    );
    if (!response) {
      throw new ConflictException('Не получилось авторизоваться');
    }
    return response;
  }

  // todo сделать типы одни и теже для микросревиса и тут
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const response = await firstValueFrom(
      this.client.send({ cmd: LOGIN_MS }, body),
    );
    if (!response) {
      throw new UnauthorizedException('Не найден пользователь');
    }
    return response;
  }

  //
  // @Post('refresh')
  // async refresh(@Body('refresh_token') refreshToken: string) {
  //   const payload = await this.authService.verifyRefreshToken(refreshToken);
  //   console.log('send new token');
  //   return this.authService.generateTokens(payload);
  // }
}
