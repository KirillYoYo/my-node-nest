import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from '../servicesNames';
import { GET_USERS_MS } from '@src/messagesMS';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectConnection() readonly connection: Connection,
    @Inject(AUTH_SERVICE) private readonly client: ClientProxy,
  ) {
    this.connection.once('open', () => {
      console.log('MongoDB connection is open');
    });

    this.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
  }

  async onModuleInit() {
    this.client.send({ cmd: GET_USERS_MS }, {}).subscribe((res) => {
      console.log('📥 Response from microservice:', res);
    });
  }
}
