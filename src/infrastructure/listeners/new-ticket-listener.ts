import {AddNewTicket} from '../../domain/usecases/add-new-ticket';
import TicketHandlerRepositoryInterface from '../../domain/repositories/ticket-handler-repository-interface';
import {TicketHandlerInfo} from '../../domain/models/ticket-handler-info';
import {SocketClient} from '../socket-client';

export class NewTicketListener {
    private readonly socketClient: SocketClient;
    private readonly ticketHandlerRepository: TicketHandlerRepositoryInterface;

    constructor({ socketClient, ticketHandlerRepository }:{ socketClient: SocketClient; ticketHandlerRepository: TicketHandlerRepositoryInterface }) {
        this.socketClient = socketClient;
        this.ticketHandlerRepository = ticketHandlerRepository;
    }

    public execute(callback): void {
        const addNewTicket = new AddNewTicket(this.ticketHandlerRepository);
        callback(addNewTicket.addNewTicket());

        const ticketHandlerInfo: TicketHandlerInfo = this.ticketHandlerRepository.readCurrentTicketHandlerInformation();
        this.socketClient.broadcast({ eventName: 'cola-ticket', payload: ticketHandlerInfo.tickets.length });
    }
}