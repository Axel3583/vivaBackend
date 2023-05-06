import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket } from '../tickets/entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private readonly ticketModel: Model<Ticket>,
  ) {}

  async createTicket(code: string): Promise<Ticket> {
    const newTicket = new this.ticketModel({ code, isValid: true });
    return await newTicket.save();
  }  

  async deleteTicket(id: string): Promise<void> {
    const deletedTicket = await this.ticketModel.findByIdAndDelete(id);
    if (!deletedTicket) {
      throw new NotFoundException('Ticket not found');
    }
  }

  async findAll(): Promise<Ticket[]> {
    return await this.ticketModel.find().exec();
  }
}
