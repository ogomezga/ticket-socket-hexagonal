import { AwilixContainer, BuildResolver, Constructor, DisposableResolver, Lifetime, asClass, createContainer } from 'awilix';
import { Dependencies } from './infrastructure/dependencies';
import { TicketRepository } from './infrastructure/repositories/ticket-handler-repository';

let container: AwilixContainer<Dependencies>;

export function getMainContainer() {
    if (!container) {
        container = createContainer();

        container.register({
            ticketHandlerRepository: asSingletonClass(TicketRepository),
        });
    }

    return container;
}

function asSingletonClass<T>(type: Constructor<T>): BuildResolver<T> & DisposableResolver<T> {
    return asClass(type, { lifetime: Lifetime.SINGLETON });
}