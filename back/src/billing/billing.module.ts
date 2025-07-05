import { Module } from '@nestjs/common';
import { BillingController } from '@src/billing/billing.controller';

@Module({
  controllers: [BillingController],
  providers: [],
})
export class BillingModule {}
