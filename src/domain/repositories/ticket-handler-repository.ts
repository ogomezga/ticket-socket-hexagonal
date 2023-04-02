import { TicketHandlerInfo } from '../models/ticket-handler-info';

export interface TicketHandler {
    saveCurrentTicketHandlerInformation(ticketHandlerInfo: TicketHandlerInfo): void;

    readCurrentTicketHandlerInformation(): TicketHandlerInfo;
}