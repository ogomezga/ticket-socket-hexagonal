import SocketClientInterface from '../../domain/socket-client-interface';
import {Ticket} from '../../domain/models/ticket';

export class SocketClientMock implements SocketClientInterface {
    private socketServer = jest.fn();

    emit({eventName, payload}: { eventName: string; payload: Ticket | Ticket[] | number }): void {
        this.socketServer(eventName, payload);
    }

    assertEmitHaveBeenCalledTimes ( times: number ) {
        expect(this.socketServer).toHaveBeenCalledTimes(times);
    }

    assertEmitHaveBeenCalledWith ( times: number, args: { eventName: string; payload: Ticket | Ticket[] | number } ) {
        expect(this.socketServer).toHaveBeenNthCalledWith(times, args.eventName, args.payload);
    }
}