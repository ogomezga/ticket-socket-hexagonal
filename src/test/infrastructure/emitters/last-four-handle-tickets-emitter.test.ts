import {SocketClientMock} from '../socket-client-mock';
import {TicketHandlerRepositoryMock} from '../repositories/ticket-handler-repository-mock';
import {LastFourHandleTicketsEmitter} from '../../../infrastructure/emitters/last-four-handle-tickets-emitter';
import {TicketHandlerInfo} from '../../../domain/models/ticket-handler-info';

describe('LastFourHandleTicketsEmitter Suite test', () => {
    it('should emit the last four tickets', () => {
        // Given
        const socketClientMock = new SocketClientMock();
        const ticketHandlerRepositoryMock = new TicketHandlerRepositoryMock();

        ticketHandlerRepositoryMock.mockTicketHandlerInfo(new TicketHandlerInfo({
            latestTicket: 1,
            today: 13,
            tickets: [],
            lastFourTickets: [{
                numb: 1,
                desk: 1,
            }],
        }));

        const lastFourHandleTicketsEmitter = new LastFourHandleTicketsEmitter({
            socketClient: socketClientMock,
            ticketHandlerRepository: ticketHandlerRepositoryMock,
        });

        // when
        lastFourHandleTicketsEmitter.emit();

        // Then
        const expectedArgs = { eventName: 'ultimos-ticket', payload: [{desk: 1, numb: 1}]};
        socketClientMock.assertEmitHaveBeenCalledTimes(1);
        socketClientMock.assertEmitHaveBeenCalledWith(1, expectedArgs);
    });
});