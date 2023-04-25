import {
    AwilixContainer,
    BuildResolver,
    Constructor,
    DisposableResolver,
    Lifetime,
    asClass,
    createContainer, asValue,
} from 'awilix';
import { Dependencies } from './infrastructure/dependencies';
import { TicketRepository } from './infrastructure/repositories/ticket-handler-repository';
import { ServerFactory } from './infrastructure/server-factory';
import { RegistrationMap } from './infrastructure/dependency-injection';

let container: AwilixContainer;

export function getMainContainer() {
    if (!container) {
        container = createContainer();

        container.register({
            ticketHandlerRepository: asSingletonClass(TicketRepository),
            serverFactory: asSingletonClass(ServerFactory),
            socketServer: asValue(null),
        } as RegistrationMap<Dependencies>);
    }

    return container;
}

function asSingletonClass<T>(type: Constructor<T>): BuildResolver<T> & DisposableResolver<T> {
    return asClass(type, { lifetime: Lifetime.SINGLETON });
}