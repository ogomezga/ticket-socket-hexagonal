import {SocketClientMock} from '../socket-client-mock';
import {TicketHandlerRepositoryMock} from '../repositories/ticket-handler-repository-mock';
import {NewTicketListener} from '../../../infrastructure/listeners/new-ticket-listener';
import {TicketHandlerInfo} from '../../../domain/models/ticket-handler-info';

describe('NewTicketListener Suite test', () => {
    const socketClientMock = new SocketClientMock();
    const ticketHandlerRepositoryMock = new TicketHandlerRepositoryMock();

    const newTicketListener = new NewTicketListener({
        socketClient: socketClientMock,
        ticketHandlerRepository: ticketHandlerRepositoryMock,
    });

    beforeEach(() => {
        ticketHandlerRepositoryMock.reset();
    });

    it('should execute and return the new ticket', () => {
        // Given
        ticketHandlerRepositoryMock.mockTicketHandlerInfo(new TicketHandlerInfo({
            latestTicket: 1,
            today: 13,
            tickets: [{
                numb: 1,
                desk: null,
            }],
            lastFourTickets: [],
        }));
        const callbackMock = jest.fn();

        // When
        newTicketListener.execute(callbackMock);

        // Then
        expect(callbackMock).toHaveBeenCalledTimes(1);
        expect(callbackMock).toHaveBeenCalledWith(expect.objectContaining({ numb: 2, desk: null }));
    });

    it('should emit the event cola-ticket correctly', () => {
        // Given
        ticketHandlerRepositoryMock.mockTicketHandlerInfo(new TicketHandlerInfo({
            latestTicket: 1,
            today: 13,
            tickets: [],
            lastFourTickets: [],
        }));
        const callbackMock = jest.fn();

        // When
        newTicketListener.execute(callbackMock);

        // Then
        const expectedArgs = { eventName: 'cola-ticket', payload: 1};
        socketClientMock.assertEmitHaveBeenCalledTimes(1);
        socketClientMock.assertEmitHaveBeenCalledWith(1, expectedArgs);
    });
});
