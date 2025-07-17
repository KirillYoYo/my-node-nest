import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/Prisma.service';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async create(owner: string) {
    return this.prisma.account.create({
      data: { owner },
    });
  }

  async getAll() {
    return this.prisma.account.findMany();
  }

  async getOne(id: number) {
    return this.prisma.account.findUnique({
      where: { id },
      include: {
        sentTransactions: true,
        receivedTransactions: true,
      },
    });
  }
}
