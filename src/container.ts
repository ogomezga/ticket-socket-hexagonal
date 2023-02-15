import { AwilixContainer, createContainer } from "awilix";

let container: AwilixContainer;

export function getMainContainer() {
    if (!container) {
        container = createContainer();
    }
    return container;
}