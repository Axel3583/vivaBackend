import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Ticket extends Document {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true, default: false })
  isValid: boolean;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
