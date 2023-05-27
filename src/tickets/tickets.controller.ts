import { Body, Controller, Delete, Get, NotFoundException, Param, Post, HttpException, HttpStatus, Query } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket } from '../tickets/entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async createTicket(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    // Vérifie si le code du ticket est valide (caractères alphanumériques)
    const isValidEncoding = /^[a-zA-Z0-9]+$/.test(createTicketDto.code);
    if (!isValidEncoding) {
      throw new HttpException('Ticket code not valid', HttpStatus.BAD_REQUEST);
    }

    return await this.ticketsService.create(createTicketDto);
  }

  @Delete(':id')
  async deleteTicket(@Param('id') id: string): Promise<{ message: string }> {
    await this.ticketsService.deleteTicket(id);
    return { message: `Ticket with ID ${id} has been deleted` };
  }

  @Get(':id')
  async getTicket(@Param('id') id: string): Promise<{ message: string }> {
    await this.ticketsService.findByCode(id);
    return { message: `Ticket with ID ${id} has been deleted` };
  }
  @Get()
  async findAll(): Promise<Ticket[]> {
    return await this.ticketsService.findAll();
  }

  @Get('check-validity')
  async checkValidity(@Query('code') code: string): Promise<{ isValid: boolean }> {
    const isValid = await this.ticketsService.isTicketValid(code);
    return { isValid };
  }
}
