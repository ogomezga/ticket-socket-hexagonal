import { Ticket } from '../ticket';

export type TicketHandlerInfo = {
    latestTicket: number;
    today: number;
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