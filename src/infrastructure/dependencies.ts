import { ServerFactory } from './server-factory';
import TicketHandlerRepositoryInterface from '../domain/repositories/ticket-handler-repository-interface';

type ServerDependencies = {
    serverFactory: ServerFactory;
};

type RepositoryDependencies = {
    ticketHandlerRepository: TicketHandlerRepositoryInterface;
};

export type Dependencies = ServerDependencies & RepositoryDependencies;