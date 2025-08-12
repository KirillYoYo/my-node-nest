import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ImportService } from '@src/ImportDb.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { JwtAuthGuard } from '@src/auth-gateway/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly importService: ImportService,
    @InjectConnection() private readonly connection: Connection,
  ) {
    this.listCollections();
  }

  @UseGuards(JwtAuthGuard)
  @Get('collections')
  async listCollections() {
    if (!this.connection || !this.connection.db) {
      return;
    }
    const collections = await this.connection.db.listCollections().toArray();
    // const result = await this.connection.collection('shipwrecks').drop();
    console.log(
      'Текущие коллекции из монги: ',
      collections.map((el) => el.name),
    );
    return collections;
    // const persons = await this.connection.db
    //   .collection('people')
    //   .find()
    //   .toArray();
    // console.log('persons', persons);
    // if (!collections.find((collection) => collection.name === 'shipwrecks')) {
    //   return await this.importService.importBase(
    //     './src/shipwrecks.json',
    //     './src/shipwrecks2.json',
    //     'shipwrecks',
    //   );
    // }
  }
}
