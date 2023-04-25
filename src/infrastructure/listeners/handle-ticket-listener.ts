import TicketHandlerRepositoryInterface from '../../domain/repositories/ticket-handler-repository-interface';
import {AssignTicket} from '../../domain/usecases/assign-ticket';
import {SocketClient} from '../socket-client';

export class HandleTicketListener {
    private readonly socketClient: SocketClient;
    private readonly ticketHandlerRepository: TicketHandlerRepositoryInterface;

    constructor({ socketClient, ticketHandlerRepository }:{ socketClient: SocketClient; ticketHandlerRepository: TicketHandlerRepositoryInterface }) {
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
        this.socketClient.broadcast({ eventName: 'ultimos-ticket', payload: ticketHandlerInfo.lastFourTickets });
        this.socketClient.broadcast({ eventName: 'cola-ticket', payload: ticketHandlerInfo.tickets.length });
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