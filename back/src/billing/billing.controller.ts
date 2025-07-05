import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class BillingController {
  @MessagePattern('billing_routingKey')
  async handleBillingMessage(@Payload() data: any) {
    console.log('Received billing message:', data);
    return { status: 'processed' };
  }
}
