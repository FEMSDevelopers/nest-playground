import { Serializer, OutgoingResponse } from '@nestjs/microservices';

export class OutboundResponseSerializer implements Serializer {
  serialize(value: { data: OutgoingResponse }) {
    return value.data;
  }
}
