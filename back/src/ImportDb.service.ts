import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { getJson } from '@src/utils/getJson';
import { runInWorker } from '@src/workers/run-in-worker';

@Injectable()
export class ImportService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async importBase(
    inputPath: string,
    outputPath: string,
    collectionName: string,
  ) {
    const collection = this.connection.collection(collectionName);

    const jsonData = await runInWorker(getJson, [inputPath, outputPath]);

    const result = await collection.insertMany(await jsonData);
    console.log(`Импортировано ${result.insertedCount} записей`);
  }
}
