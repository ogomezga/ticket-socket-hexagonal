import TicketHandlerRepositoryInterface from '../../domain/repositories/ticket-handler-repository-interface';
import {TicketHandlerInfo} from '../../domain/models/ticket-handler-info';
import SocketClientInterface from '../../domain/socket-client-interface';

export class PendingTicketsEmitter {
    private readonly socketClient: SocketClientInterface;
    private readonly ticketHandlerRepository: TicketHandlerRepositoryInterface;

    constructor({ socketClient, ticketHandlerRepository }:{ socketClient: SocketClientInterface; ticketHandlerRepository: TicketHandlerRepositoryInterface }) {
        this.socketClient = socketClient;
        this.ticketHandlerRepository = ticketHandlerRepository;
    }

    public emit(): void {
        const ticketHandlerInfo: TicketHandlerInfo = this.ticketHandlerRepository.readCurrentTicketHandlerInformation();
        this.socketClient.emit({ eventName: 'cola-ticket', payload: ticketHandlerInfo.tickets.length });
    }
}