import { ServerFactory } from './infrastructure/server-factory';
import * as dotenv from 'dotenv';
import {resolveDependency} from './infrastructure/dependency-injection';

dotenv.config();
const serverFactory: ServerFactory = resolveDependency('serverFactory');

Promise.all([serverFactory.createServer({ port: process.env.PORT}), serverFactory.start()])
.then(() => {
    serverFactory.onSocketConnection();
    console.info('Server started: ', serverFactory.getPort());
})
.catch((reason) => console.error('Error en in server: ', reason));