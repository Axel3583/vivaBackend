import { Module } from '@nestjs/common';
import { StandService } from './stands.service';
import { StandController } from './stands.controller';

@Module({
  controllers: [StandController],
  providers: [StandService]
})
export class StandsModule {}
