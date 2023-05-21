import {Ticket} from './models/ticket';

export default interface SocketClientInterface {
    emit({eventName, payload}: { eventName: string; payload: Ticket | Ticket[] | number }): void;
}