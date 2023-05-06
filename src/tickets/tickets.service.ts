import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket } from '../tickets/entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private readonly ticketModel: Model<Ticket>,
  ) {}

  async validateTicket(code: string): Promise<Ticket> {
    const ticket = await this.ticketModel.findOne({ code });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    ticket.isValid = this.checkTicketValidity(ticket.code);
    await ticket.save();
    return ticket;
  }

  private checkTicketValidity(code: string): boolean {
    return code.length === 8;
  }
}
