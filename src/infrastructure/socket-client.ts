import {Server} from 'socket.io';
import {Ticket} from '../domain/models/ticket';

export class SocketClient {
    private socketServer: Server;

    registerSocketServer(socketServer: Server): void {
        this.socketServer = socketServer;
    }

    emit({eventName, payload}: { eventName: string; payload: Ticket | Ticket[] | number }): void {
        this.socketServer.emit(eventName, payload);
    }
}