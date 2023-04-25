import {
    AwilixContainer,
    BuildResolver,
    Constructor,
    DisposableResolver,
    Lifetime,
    asClass,
    createContainer,
} from 'awilix';
import {InfrastructureDependencies} from './dependencies';
import {NewTicketListener} from './listeners/new-ticket-listener';
import {HandleTicketListener} from './listeners/handle-ticket-listener';
import {LastTicketEmitter} from './emitters/last-ticket-emitter';
import {PendingTicketsEmitter} from './emitters/pending-tickets-emitter';
import {LastFourHandleTicketsEmitter} from './emitters/last-four-handle-tickets-emitter';
import {RegistrationMap} from './dependency-injection';
import {SocketClient} from './socket-client';

let container: AwilixContainer;

export function getInfrastructureContainer() {
    if (!container) {
        container = createContainer();

        container.register({
            newTicketListener: asSingletonClass(NewTicketListener),
            handleTicketListener: asSingletonClass(HandleTicketListener),
            lastTicketEmitter: asSingletonClass(LastTicketEmitter),
            pendingTicketsEmitter: asSingletonClass(PendingTicketsEmitter),
            lastFourHandleTicketsEmitter: asSingletonClass(LastFourHandleTicketsEmitter),
            socketClient: asSingletonClass(SocketClient),
        } as RegistrationMap<InfrastructureDependencies>);
    }

    return container;
}

function asSingletonClass<T>(type: Constructor<T>): BuildResolver<T> & DisposableResolver<T> {
    return asClass(type, { lifetime: Lifetime.SINGLETON });
}