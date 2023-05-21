import {SocketClientMock} from '../socket-client-mock';
import {TicketHandlerRepositoryMock} from '../repositories/ticket-handler-repository-mock';
import {TicketHandlerInfo} from '../../../domain/models/ticket-handler-info';
import {PendingTicketsEmitter} from '../../../infrastructure/emitters/pending-tickets-emitter';

describe('PendingTicketsEmitter Suite test', () => {
    it('should emit the number of pending tickets', () => {
        // Given
        const socketClientMock = new SocketClientMock();
        const ticketHandlerRepositoryMock = new TicketHandlerRepositoryMock();

        ticketHandlerRepositoryMock.mockTicketHandlerInfo(new TicketHandlerInfo({
            latestTicket: 1,
            today: 13,
            tickets: [{
                numb: 1,
                desk: null,
            }],
            lastFourTickets: [],
        }));

        const pendingTicketsEmitter = new PendingTicketsEmitter({
            socketClient: socketClientMock,
            ticketHandlerRepository: ticketHandlerRepositoryMock,
        });

        // when
        pendingTicketsEmitter.emit();

        // Then
        const expectedArgs = { eventName: 'cola-ticket', payload: 1};
        socketClientMock.assertEmitHaveBeenCalledTimes(1);
        socketClientMock.assertEmitHaveBeenCalledWith(1, expectedArgs);
    });
});