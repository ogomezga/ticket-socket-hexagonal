import {Server} from 'socket.io';
import {Ticket} from '../domain/models/ticket';

export class SocketClient {
    private socketServer: Server;

    constructor(socketServer: Server) {
        this.socketServer = socketServer;
    }

    broadcast ({ eventName, payload }:{eventName: string; payload: Ticket | Ticket[] | number}): void {
        this.socketServer.emit(eventName, payload);
    }

    async emit({eventName, payload}: { eventName: string; payload: Ticket | Ticket[] | number }): Promise<void> {
        this.socketServer.serverSideEmit(eventName, payload);
    }
}