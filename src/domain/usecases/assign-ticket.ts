import { Ticket } from '../models/ticket';
import { TicketHandler } from '../repositories/ticket-handler-repository';
import { TicketHandlerInfo } from '../models/ticket-handler-info';

export class AssignTicket {
    private ticketHandlerRepository: TicketHandler;

    constructor( ticketHandlerRepository: TicketHandler ) {
        this.ticketHandlerRepository = ticketHandlerRepository;
    }

    public assignTicket( desktop: number ): Ticket {
        const ticketHandlerInfo: TicketHandlerInfo = this.ticketHandlerRepository.readCurrentTicketHandlerInformation();

        if ( !ticketHandlerInfo.isThereTicketToAttend() ) {
            return null;
        }

        const ticket = ticketHandlerInfo.getFirstTicketToBeAttended();
        ticket.desk = desktop;

        ticketHandlerInfo.addTicketToTheLastFourAttendedTickets(ticket);

        this.ticketHandlerRepository.saveCurrentTicketHandlerInformation(ticketHandlerInfo);
        return ticket;
    }
}


/*
assingTicket( desktop: number ){


    }
*/