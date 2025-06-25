import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  constructor(@InjectConnection() readonly connection: Connection) {
    console.log('inside AppService');
    this.connection.once('open', () => {
      console.log('MongoDB connection is open');
    });

    this.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
  }
}
