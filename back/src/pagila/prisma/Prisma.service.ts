import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '.prisma/pagilaPrismaClient';
import { Client } from 'pg';

@Injectable()
export class PrismaPagilaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private client: Client;

  async onModuleInit() {
    this.client = new Client({
      user: 'admin',
      password: 'admin',
      database: 'pagila',
      host: 'localhost',
      port: 5432,
    });
    await this.client.connect();
    /**/
    await this.$connect();
    this.getYum();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async getYum() {
    await this.$connect();
    const res = await this.client.query(
      'SELECT * FROM packages_yum_postgresql_org',
    );
    const res2 = await this.packages_apt_postgresql_org.findMany();
    // console.log('from pg', res);
    // console.log('from prisma', res2);
  }
}
