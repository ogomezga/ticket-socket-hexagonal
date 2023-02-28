import { ServerFactory } from './infrastructure/server-factory';
import * as dotenv from 'dotenv';

dotenv.config();
const serverFactory = new ServerFactory({ port: process.env.PORT});

Promise.all([serverFactory.createServer(), serverFactory.start()])
.then(() => console.info('Server started: ', serverFactory.getPort()))
.catch((reason) => console.error('Error en in server: ', reason));