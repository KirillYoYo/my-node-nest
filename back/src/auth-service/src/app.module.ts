import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User, UsersSchema } from './users/users.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthMicroserviceController } from './auth.microservice.controller';

const isDev = process.env.NODE_ENV === 'development';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: '.env',
    // }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '../../../.env',
          isGlobal: true,
        }),
      ],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get<string>('MONGO_USERNAME');
        const password = configService.get<string>('MONGO_PASSWORD');
        const host = configService.get<string>('MONGO_HOST');
        const port = configService.get<string>('MONGO_PORT');
        const db = configService.get<string>('MONGO_DB');
        const authSource = configService.get<string>('MONGO_AUTH_SOURCE');

        const uri = `mongodb://${username}:${password}@${isDev ? 'localhost' : host}:${port}/${db}?authSource=${authSource}`;

        return { uri };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UsersSchema }]),
    AuthModule,
    UsersModule,
  ],
  controllers: [AuthMicroserviceController],
  providers: [AuthService],
})
export class AppModule {}
