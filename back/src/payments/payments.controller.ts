import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}

  @Post('payment')
  async processPayment(@Body() paymentDto: any) {
    return this.paymentService.sendPayment(paymentDto);
  }
}
