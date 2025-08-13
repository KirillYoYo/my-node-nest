import {
  Controller,
  Post,
  Body,
  Inject,
  UnauthorizedException,
  ConflictException,
  Res,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AUTH_SERVICE } from '../../servicesNames';
import { ClientProxy } from '@nestjs/microservices';
import { LOGIN_MS, REFRESH_MS, REGISTER_MS } from '@src/messagesMS';
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
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() body: { email: string; password: string },
  ) {
    const response = await firstValueFrom(
      this.client.send({ cmd: LOGIN_MS }, body),
    );
    if (!response) {
      throw new UnauthorizedException('Не найден пользователь');
    }
    res.cookie('access_token', response.access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 15,
    });
    res.cookie('refresh_token', response.refresh_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return response;
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
      throw new UnauthorizedException('Нет refresh токена');
    }

    const response = await firstValueFrom(
      this.client.send({ cmd: REFRESH_MS }, refreshToken),
    );

    res.cookie('access_token', response.access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 15,
    });

    if (!res) {
      throw new UnauthorizedException('Проблема с refresh');
    }

    res.status(200).json({ ok: true });
  }
}
