import { Body, Controller, Delete, Get, NotFoundException, Param, Post, HttpException, HttpStatus } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket } from '../tickets/entities/ticket.entity';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async createTicket(@Body('code') code: string): Promise<Ticket> {
    // Vérifie si le code du ticket ne contient que des caractères alphanumériques
    const isValidEncoding = /^[a-zA-Z0-9]{3,}$/.test(code);
    console.log('isValidEncoding:', isValidEncoding);
    if (!isValidEncoding) {
      throw new HttpException('Ticket code not valid', HttpStatus.BAD_REQUEST);
    }
    return await this.ticketsService.createTicket(code);
  }

  @Delete(':id')
  async deleteTicket(@Param('id') id: string): Promise<{ message: string }> {
    await this.ticketsService.deleteTicket(id);
    return { message: `Ticket with ID ${id} has been deleted` };
  }

  @Get()
  async findAll(): Promise<Ticket[]> {
    return await this.ticketsService.findAll();
  }
}
