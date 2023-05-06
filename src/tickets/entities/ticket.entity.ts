import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Ticket extends Document {
  @Prop({ required: true })
  code: string;

  @Prop({ default: true })
  isValid: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
