import {Server} from 'socket.io';
import {SocketClient} from '../../infrastructure/socket-client';
import {Ticket} from '../../domain/models/ticket';
import {ObjectStub} from '../helpers/object-stub';

describe('SocketClient Suit test', () => {
    const stubs = {
        server: {
            emit: jest.fn(),
        } as ObjectStub<Server>,
    };
    let socketClient: SocketClient;

    beforeEach(() => {
        socketClient = new SocketClient();
        socketClient.registerSocketServer(stubs.server as any);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Should emit an event where the payload value is a ticket', () => {
        const eventName = 'ticket_event';
        const ticket = { numb: 1, desk: 123} as Ticket;
        socketClient.emit({ eventName, payload: ticket });

        expect(stubs.server.emit).toHaveBeenCalledWith(eventName, ticket);
    });

    test('Should emit an event where the payload value is a tickets array', () => {
        const eventName = 'tickets_event';
        const tickets = [{ numb: 1, desk: 123}, { numb: 2, desk: 124}];
        socketClient.emit({ eventName, payload: tickets });

        expect(stubs.server.emit).toHaveBeenCalledWith(eventName, tickets);
    });

    test('Should emit an event where the payload value is a number', () => {
        const eventName = 'number_event';
        const numb = 42;
        socketClient.emit({ eventName, payload: numb });

        expect(stubs.server.emit).toHaveBeenCalledWith(eventName, numb);
    });
});
