import { TicketHandlerInfo } from '../models/ticket-handler-info';

export default interface TicketHandlerRepositoryInterface {
    saveCurrentTicketHandlerInformation(ticketHandlerInfo: TicketHandlerInfo): void;

    readCurrentTicketHandlerInformation(): TicketHandlerInfo;
}