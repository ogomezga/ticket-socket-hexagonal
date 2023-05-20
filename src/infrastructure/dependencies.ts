import { ServerFactory } from './server-factory';
import TicketHandlerRepositoryInterface from '../domain/repositories/ticket-handler-repository-interface';
import {NewTicketListener} from './listeners/new-ticket-listener';
import {HandleTicketListener} from './listeners/handle-ticket-listener';
import {PendingTicketsEmitter} from './emitters/pending-tickets-emitter';
import {LastFourHandleTicketsEmitter} from './emitters/last-four-handle-tickets-emitter';
import {LastTicketEmitter} from './emitters/last-ticket-emitter';
import {SocketClient} from './socket-client';

type ServerDependencies = {
    serverFactory: ServerFactory;
};

export type InfrastructureDependencies = {
    socketClient?: SocketClient;
} & ListenerDependencies & EmitterDependencies;

type RepositoryDependencies = {
    ticketHandlerRepository: TicketHandlerRepositoryInterface;
};

type ListenerDependencies = {
    newTicketListener?: NewTicketListener;
    handleTicketListener?: HandleTicketListener;
};

type EmitterDependencies = {
    lastTicketEmitter?: LastTicketEmitter;
    pendingTicketsEmitter?: PendingTicketsEmitter;
    lastFourHandleTicketsEmitter?: LastFourHandleTicketsEmitter;
};

export type Dependencies = ServerDependencies & RepositoryDependencies & InfrastructureDependencies;