import TicketHandlerRepositoryInterface from '../../domain/repositories/ticket-handler-repository-interface';
import {TicketHandlerInfo} from '../../domain/models/ticket-handler-info';
import {SocketClient} from '../socket-client';

export class PendingTicketsEmitter {
    private readonly socketClient: SocketClient;
    private readonly ticketHandlerRepository: TicketHandlerRepositoryInterface;

    constructor({ socketClient, ticketHandlerRepository }:{ socketClient: SocketClient; ticketHandlerRepository: TicketHandlerRepositoryInterface }) {
        this.socketClient = socketClient;
        this.ticketHandlerRepository = ticketHandlerRepository;
    }

    public emit(): void {
        const ticketHandlerInfo: TicketHandlerInfo = this.ticketHandlerRepository.readCurrentTicketHandlerInformation();
        this.socketClient.emit({ eventName: 'cola-ticket', payload: ticketHandlerInfo.tickets.length });
    }
}