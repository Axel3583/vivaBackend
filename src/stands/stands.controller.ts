import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Stand } from './entities/stand.entity';
import { StandService } from '../stands/stands.service';

@Controller('stands')
export class StandController {
  constructor(private readonly standService: StandService) {}

  @Get()
  async getAllStands(): Promise<Stand[]> {
    return this.standService.getAllStands();
  }

  @Get(':id')
  async getStandById(@Param('id') id: string): Promise<Stand> {
    return this.standService.getStandById(id);
  }

  @Post()
  async createStand(@Body() stand: Stand): Promise<Stand> {
    return this.standService.createStand(stand);
  }

  @Put(':id')
  async updateStand(@Param('id') id: string, @Body() stand: Stand): Promise<Stand> {
    return this.standService.updateStand(id, stand);
  }

  @Delete(':id')
  async deleteStand(@Param('id') id: string): Promise<void> {
    return this.standService.deleteStand(id);
  }
}
