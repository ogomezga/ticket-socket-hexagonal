import {HandleTicketListener} from '../../../infrastructure/listeners/handle-ticket-listener';
import {SocketClientMock} from '../socket-client-mock';
import {TicketHandlerRepositoryMock} from '../repositories/ticket-handler-repository-mock';
import {TicketHandlerInfo} from '../../../domain/models/ticket-handler-info';

describe('HandleTicketListener Suite test', () => {
    const socketClientMock = new SocketClientMock();
    const ticketHandlerRepositoryMock = new TicketHandlerRepositoryMock();

    const handleTicketListener = new HandleTicketListener({
        socketClient: socketClientMock,
        ticketHandlerRepository: ticketHandlerRepositoryMock,
    });

    beforeEach(() => {
       ticketHandlerRepositoryMock.reset();
    });

    it('Given an invalid desktop, should return error on the callback', () => {
        const escritorio = null;
        const callback = jest.fn();

        // When
        handleTicketListener.execute({ escritorio, callback });

        // Then
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(expect.objectContaining({
            ok: false,
            msg: 'El desktop es obligatorio',
        }));
    });

    describe('Given a valid desktop', () => {
        it('should emit the events ultimos-ticket and cola-ticket', () => {
            // Given
            ticketHandlerRepositoryMock.mockTicketHandlerInfo(new TicketHandlerInfo({
                latestTicket: 1,
                today: 13,
                tickets: [],
                lastFourTickets: [],
            }));

            const escritorio = 1;
            const callback = jest.fn();

            // When
            handleTicketListener.execute({ escritorio, callback });

            // Then
            socketClientMock.assertEmitHaveBeenCalledTimes(2);
        });

        it('should emit the event ultimos-ticket correctly', () => {
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

            const escritorio = 1;
            const callback = jest.fn();

            // When
            handleTicketListener.execute({ escritorio, callback });

            // Then
            const expectedArgs = { eventName: 'ultimos-ticket', payload: [{desk: 1, numb: 1}]};
            socketClientMock.assertEmitHaveBeenCalledWith(1, expectedArgs);
        });

        it('should emit the event cola-ticket correctly', () => {
            // Given
            ticketHandlerRepositoryMock.mockTicketHandlerInfo(new TicketHandlerInfo({
                latestTicket: 1,
                today: 13,
                tickets: [],
                lastFourTickets: [],
            }));

            const escritorio = 1;
            const callback = jest.fn();

            // When
            handleTicketListener.execute({ escritorio, callback });

            // Then
            const expectedArgs = { eventName: 'cola-ticket', payload: 0};
            socketClientMock.assertEmitHaveBeenCalledWith(2, expectedArgs);
        });

        it('should do something', () => {
            // Given
            ticketHandlerRepositoryMock.mockTicketHandlerInfo(new TicketHandlerInfo({
                latestTicket: 1,
                today: 13,
                tickets: [],
                lastFourTickets: [],
            }));

            const escritorio = 1;
            const callback = jest.fn();

            // When
            handleTicketListener.execute({ escritorio, callback });

            // Then
            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith(expect.objectContaining({
                ok: false,
                msg: 'Ya no hay tickets pendientes',
            }));
        });

        it('should execute with valid desktop and return a ticket', () => {
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

            const escritorio = 1;
            const callback = jest.fn();

            // When
            handleTicketListener.execute({ escritorio, callback });

            // Then
            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith(expect.objectContaining({
                ok: true,
                ticket: {
                    numb: 1,
                    desk: escritorio,
                },
            }));
        });
    });
});