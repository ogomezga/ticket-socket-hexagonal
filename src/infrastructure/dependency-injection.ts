import { Dependencies } from './dependencies';
import { AwilixContainer, Resolver } from 'awilix';
import { getMainContainer } from '../container';

export function resolveDependency<T extends keyof Dependencies>(key: T, inputContainer?: AwilixContainer): Dependencies[T] {
    if(!inputContainer) {
        inputContainer = getMainContainer();
    }

    return inputContainer.resolve(key);
}

export type RegistrationMap<Dependencies> = {[key in keyof Dependencies]: Resolver<any>};