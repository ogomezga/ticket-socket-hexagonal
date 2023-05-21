import {Server} from 'socket.io';
import {Ticket} from './models/ticket';

export default interface SocketClientInterface {
    registerSocketServer(socketServer: Server): void;

    emit({eventName, payload}: { eventName: string; payload: Ticket | Ticket[] | number }): void;
}