import {Server} from 'socket.io';
import {Ticket} from '../domain/models/ticket';
import SocketClientInterface from '../domain/socket-client-interface';

export class SocketClient implements SocketClientInterface{
    private socketServer: Server;

    registerSocketServer(socketServer: Server): void {
        this.socketServer = socketServer;
    }

    emit({eventName, payload}: { eventName: string; payload: Ticket | Ticket[] | number }): void {
        this.socketServer.emit(eventName, payload);
    }
}