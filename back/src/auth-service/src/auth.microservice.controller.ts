import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
// todo сделать алиасы или что
import { GET_USERS_MS } from '../../messagesMS';

@Controller()
export class AuthMicroserviceController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  // Проверка access_token через RabbitMQ
  @MessagePattern('validate_token')
  async validateToken(@Payload() data: { token: string }) {
    return this.authService.validateAccessToken(data.token);
  }

  // Обновление токенов (refresh flow)
  @MessagePattern('refresh_token')
  async refreshToken(@Payload() data: { refresh_token: string }) {
    try {
      const payload = await this.authService.verifyRefreshToken(
        data.refresh_token,
      );
      return await this.authService.generateTokens({
        sub: payload.sub,
        email: payload.email,
      });
    } catch (err) {
      return { error: 'Invalid refresh token' };
    }
  }

  // Генерация пары токенов (можно вызывать после регистрации или логина)
  @MessagePattern('generate_tokens')
  async generateTokens(@Payload() data: { sub: number; email: string }) {
    return this.authService.generateTokens(data);
  }

  @MessagePattern({ cmd: GET_USERS_MS })
  async getUsers(@Payload() data: { sub: number; email: string }) {
    this.usersService.findAll().then((users) => {
      console.log(
        'текущие пользователи (users) в auth mongo !',
        users.map((user) => user.email),
      );
    });
    return 'response from getUSers';
  }
}
