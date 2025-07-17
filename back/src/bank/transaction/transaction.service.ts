import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/Prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {
    console.log('!!!!!!!!!!', prisma);
  }

  async transfer(senderId: number, receiverId: number, amount: number) {
    if (senderId === receiverId) {
      throw new BadRequestException("Can't transfer to same account");
    }

    return this.prisma.$transaction(async (tx) => {
      const sender = await tx.account.findUnique({ where: { id: senderId } });
      const receiver = await tx.account.findUnique({
        where: { id: receiverId },
      });

      if (!sender || !receiver) {
        throw new BadRequestException('Invalid account IDs');
      }

      if (sender.balance < amount) {
        throw new BadRequestException('Insufficient funds');
      }

      await tx.account.update({
        where: { id: senderId },
        data: { balance: sender.balance - amount },
      });

      await tx.account.update({
        where: { id: receiverId },
        data: { balance: receiver.balance + amount },
      });

      return tx.transaction.create({
        data: {
          amount,
          senderId,
          receiverId,
        },
      });
    });
  }
}
