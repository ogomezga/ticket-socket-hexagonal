import TicketHandlerRepositoryInterface from '../../domain/repositories/ticket-handler-repository-interface';
import SocketClientInterface from '../../domain/socket-client-interface';

export class LastTicketEmitter {
    private readonly socketClient: SocketClientInterface;
    private readonly ticketHandlerRepository: TicketHandlerRepositoryInterface;

    constructor({ socketClient, ticketHandlerRepository }:{ socketClient: SocketClientInterface; ticketHandlerRepository: TicketHandlerRepositoryInterface }) {
        this.socketClient = socketClient;
        this.ticketHandlerRepository = ticketHandlerRepository;
    }

    public emit(): void {
        const ticketHandlerInfo = this.ticketHandlerRepository.readCurrentTicketHandlerInformation();
        this.socketClient.emit({ eventName: 'ultimo-ticket', payload: ticketHandlerInfo.latestTicket });
    }
}