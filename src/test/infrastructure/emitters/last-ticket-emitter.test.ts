import {SocketClientMock} from '../socket-client-mock';
import {TicketHandlerRepositoryMock} from '../repositories/ticket-handler-repository-mock';
import {TicketHandlerInfo} from '../../../domain/models/ticket-handler-info';
import {LastTicketEmitter} from '../../../infrastructure/emitters/last-ticket-emitter';

describe('LastTicketEmitter Suite test', () => {
    it('should emit the latest tickets added', () => {
        // Given
        const socketClientMock = new SocketClientMock();
        const ticketHandlerRepositoryMock = new TicketHandlerRepositoryMock();

        ticketHandlerRepositoryMock.mockTicketHandlerInfo(new TicketHandlerInfo({
            latestTicket: 5,
            today: 13,
            tickets: [],
            lastFourTickets: [],
        }));

        const lastTicketEmitter = new LastTicketEmitter({
            socketClient: socketClientMock,
            ticketHandlerRepository: ticketHandlerRepositoryMock,
        });

        // when
        lastTicketEmitter.emit();

        // Then
        const expectedArgs = { eventName: 'ultimo-ticket', payload: 5};
        socketClientMock.assertEmitHaveBeenCalledTimes(1);
        socketClientMock.assertEmitHaveBeenCalledWith(1, expectedArgs);
    });
});