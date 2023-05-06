import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket } from '../tickets/entities/ticket.entity';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get(':code/validate')
  async validateTicket(@Param('code') code: string): Promise<Ticket> {
    return await this.ticketsService.validateTicket(code);
  }
}
