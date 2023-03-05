import { Ticket } from '../ticket';

type TicketHandlerInfo = {
    latestTicket: number;
    today: Date;
    tickets: Ticket[];
    lastFourTickets: Ticket[];
};

export interface TicketHandler {

    toJson(): TicketHandlerInfo;

    init(): void;

    saveCurrentTicketHandlerInformation(): void;

    addNewTicket(): Ticket;

    assingTicket(desktop: number): Ticket;
}