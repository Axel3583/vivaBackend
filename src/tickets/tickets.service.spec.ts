import { Test, TestingModule } from '@nestjs/testing';
import { TicketsService } from './tickets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './entities/ticket.entity';

describe('TicketsService', () => {
  let service: TicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb+srv://axelyvesi2:GLZjtNkFax57Lk07@postcluster.tdheiab.mongodb.net/?retryWrites=true&w=majority', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }),
        MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
      ],
      providers: [TicketsService],
    }).compile();
  
    service = module.get<TicketsService>(TicketsService);
  });
  

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
