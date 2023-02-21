import { Dependencies } from './dependencies';
import { AwilixContainer, asValue } from 'awilix';
import { getMainContainer } from '../container';


export function resolveDependency<T extends keyof Dependencies>(key: T, inputContainer?: AwilixContainer): Dependencies[T] {
    if(!inputContainer) {
        inputContainer = getMainContainer();
    }

    return inputContainer.resolve(key);
}

export function registerDependencies(dependencies: {[key in keyof Dependencies]?: any }, inputContainer?: AwilixContainer) {
    if(!inputContainer) {
        inputContainer = getMainContainer();
    }

    for (const key in dependencies) {
        inputContainer.register(key, asValue(dependencies[key]));
    }
}