import { Injectable } from '@nestjs/common';
import { Stand } from './entities/stand.entity';

@Injectable()
export class StandService {
  private stands: Stand[] = [];

  async getAllStands(): Promise<Stand[]> {
    return this.stands;
  }

  async getStandById(id: string): Promise<Stand> {
    return this.stands.find((stand) => stand.id === id);
  }

  async createStand(stand: Stand): Promise<Stand> {
    this.stands.push(stand);
    return stand;
  }

  async updateStand(id: string, updatedStand: Stand): Promise<Stand> {
    const standIndex = this.stands.findIndex((stand) => stand.id === id);
    if (standIndex !== -1) {
      this.stands[standIndex] = { ...this.stands[standIndex], ...updatedStand };
      return this.stands[standIndex];
    }
    return null;
  }

  async deleteStand(id: string): Promise<void> {
    this.stands = this.stands.filter((stand) => stand.id !== id);
  }
}
