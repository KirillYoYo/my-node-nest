import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ImportService } from '@src/ImportDb.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly importService: ImportService,
    @InjectConnection() private readonly connection: Connection,
  ) {
    this.listCollections();
  }

  @Get('collections')
  async listCollections() {
    if (!this.connection || !this.connection.db) {
      return;
    }
    const collections = await this.connection.db.listCollections().toArray();
    // const result = await this.connection.collection('shipwrecks').drop();
    console.log(
      'Current collections',
      collections.map((el) => el.name),
    );
    // if (!collections.find((collection) => collection.name === 'shipwrecks')) {
    //   return await this.importService.importBase(
    //     './src/shipwrecks.json',
    //     './src/shipwrecks2.json',
    //     'shipwrecks',
    //   );
    // }
  }
}
