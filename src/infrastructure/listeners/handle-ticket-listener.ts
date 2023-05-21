import TicketHandlerRepositoryInterface from '../../domain/repositories/ticket-handler-repository-interface';
import {AssignTicket} from '../../domain/usecases/assign-ticket';
import SocketClientInterface from '../../domain/socket-client-interface';

export class HandleTicketListener {
    private readonly socketClient: SocketClientInterface;
    private readonly ticketHandlerRepository: TicketHandlerRepositoryInterface;

    constructor({ socketClient, ticketHandlerRepository }:{ socketClient: SocketClientInterface; ticketHandlerRepository: TicketHandlerRepositoryInterface }) {
        this.socketClient = socketClient;
        this.ticketHandlerRepository = ticketHandlerRepository;
    }

    public execute({ escritorio, callback }:{ escritorio: number; callback: any }): void {
        if ( !escritorio ) {
            return callback({
                ok: false,
                msg: 'El desktop es obligatorio',
            });
        }

        const assingTicket = new AssignTicket(this.ticketHandlerRepository);
        const ticket = assingTicket.execute( escritorio );

        const ticketHandlerInfo = this.ticketHandlerRepository.readCurrentTicketHandlerInformation();
        this.socketClient.emit({ eventName: 'ultimos-ticket', payload: ticketHandlerInfo.lastFourTickets });
        this.socketClient.emit({ eventName: 'cola-ticket', payload: ticketHandlerInfo.tickets.length });
        if ( !ticket ) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes',
            });
        } else {
            callback({
                ok: true,
                ticket,
            });
        }
    }
}