import { Ticket } from '../models/ticket';
import TicketHandlerRepositoryInterface from '../repositories/ticket-handler-repository-interface';
import { TicketHandlerInfo } from '../models/ticket-handler-info';

export class AddNewTicket {
    private ticketHandlerRepository: TicketHandlerRepositoryInterface;

    constructor( ticketHandlerRepository: TicketHandlerRepositoryInterface ) {
        this.ticketHandlerRepository = ticketHandlerRepository;
    }

    public addNewTicket(): Ticket {
        let ticketHandlerInfo: TicketHandlerInfo = this.ticketHandlerRepository.readCurrentTicketHandlerInformation();
        ticketHandlerInfo = ticketHandlerInfo.increaseLatestTicket();

        const newTicket: Ticket = {
            numb: ticketHandlerInfo.latestTicket,
            desk: null,
        };
        ticketHandlerInfo.addNewTicket(newTicket);

        this.ticketHandlerRepository.saveCurrentTicketHandlerInformation(ticketHandlerInfo);
        return newTicket;
    }
}