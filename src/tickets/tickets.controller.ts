import { Body, Controller, Get, NotFoundException, Param, Post, HttpException, HttpStatus } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket } from '../tickets/entities/ticket.entity';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async createTicket(@Body('code') code: string): Promise<Ticket> {
    // Vérifiez si le code du ticket ne contient que des caractères alphanumériques
    const isValidEncoding = /^[a-zA-Z0-9]+$/.test(code);

    if (!isValidEncoding) {
      throw new HttpException('Ticket code not valid', HttpStatus.BAD_REQUEST);
    }

    return await this.ticketsService.createTicket(code);
  }
}
