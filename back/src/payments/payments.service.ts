import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PAYMENT_SERVICE } from '@src/payments/consts';

@Injectable()
export class PaymentsService {
  constructor(@Inject(PAYMENT_SERVICE) private readonly client: ClientProxy) {}

  async sendPayment(data: any) {
    return this.client.send('billing_routingKey', data).toPromise();
  }
}
