import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './create-ticket.dto';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
    readonly code?: string;
    readonly isValid?: boolean;
    readonly createdAt?: Date;
}

