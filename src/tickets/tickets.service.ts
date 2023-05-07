import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket } from '../tickets/entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private readonly ticketModel: Model<Ticket>,
  ) { }

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    // Recherche un ticket avec le même code
    const existingTicket = await this.findByCode(createTicketDto.code);
    // Si un ticket avec le même code existe déjà, lève une exception
    if (existingTicket) {
      throw new HttpException('Ticket with this code already exists', HttpStatus.CONFLICT);
    }
    // Sinon, crée et sauvegarde le nouveau ticket
    const newTicket = new this.ticketModel({
      ...createTicketDto,
      createdAt: new Date(),
    });
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

  async findByCode(code: string): Promise<Ticket | null> {
    return await this.ticketModel.findOne({ code }).exec();
  }  

  async isTicketValid(code: string): Promise<boolean> {
    const ticket = await this.ticketModel.findOne({ code });

    if (!ticket) {
      return false;
    }

    const ticketAge = Date.now() - ticket.createdAt.getTime();
    const oneHourInMilliseconds = 60 * 60 * 1000;

    if (ticketAge > oneHourInMilliseconds || !ticket.isValid) {
      return false;
    }

    return true;
  }
}
