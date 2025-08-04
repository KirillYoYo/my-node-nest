import { ClientProxy } from '@nestjs/microservices';
import { MessagePatterns } from './messagePatterns';

export const getUsersFromUserMs = (client: ClientProxy) => {
  return client.send(MessagePatterns.GET_USERS_MS, {});
};
