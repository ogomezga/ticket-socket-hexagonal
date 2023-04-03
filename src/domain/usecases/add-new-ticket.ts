import { Ticket } from '../models/ticket';
import TicketHandlerRepositoryInterface from '../repositories/ticket-handler-repository-interface';
import { TicketHandlerInfo } from '../models/ticket-handler-info';

export class AddNewTicket {
    private ticketHandlerRepository: TicketHandlerRepositoryInterface;

    constructor( ticketHandlerRepository: TicketHandlerRepositoryInterface ) {
        this.ticketHandlerRepository = ticketHandlerRepository;
    }

    public addNewTicket(): Ticket {
        const ticketHandlerInfo: TicketHandlerInfo = this.ticketHandlerRepository.readCurrentTicketHandlerInformation().increaseLatestTicket();

        const newTicket: Ticket = {
            numb: ticketHandlerInfo.latestTicket,
            desk: null,
        };
        ticketHandlerInfo.addNewTicket(newTicket);

        this.ticketHandlerRepository.saveCurrentTicketHandlerInformation(ticketHandlerInfo);
        return newTicket;
    }
}