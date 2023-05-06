import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketsModule } from './tickets/tickets.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/ticket-validation'),
    TicketsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
