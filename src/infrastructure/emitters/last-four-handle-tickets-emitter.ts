import TicketHandlerRepositoryInterface from '../../domain/repositories/ticket-handler-repository-interface';
import {SocketClient} from '../socket-client';

export class LastFourHandleTicketsEmitter {
    private readonly socketClient: SocketClient;
    private readonly ticketHandlerRepository: TicketHandlerRepositoryInterface;

    constructor({ socketClient, ticketHandlerRepository }:{ socketClient: SocketClient; ticketHandlerRepository: TicketHandlerRepositoryInterface }) {
        this.socketClient = socketClient;
        this.ticketHandlerRepository = ticketHandlerRepository;
    }

    public emit(): void {
        const ticketHandlerInfo = this.ticketHandlerRepository.readCurrentTicketHandlerInformation();
        this.socketClient.emit({ eventName: 'ultimos-ticket', payload: ticketHandlerInfo.lastFourTickets });
    }
}