import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketsModule } from './tickets/tickets.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { StandsModule } from './stands/stands.module';

@Module({
  imports: [
    TicketsModule,
    MongooseModule.forRoot('mongodb+srv://axelyvesi2:GLZjtNkFax57Lk07@postcluster.tdheiab.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    StandsModule
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
