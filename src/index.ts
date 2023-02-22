import { ServerFactory } from './infrastructure/server-factory';
import * as dotenv from 'dotenv';

dotenv.config();
const serverFactory = new ServerFactory({ port: process.env.PORT});

serverFactory
.createServer()
.then(async() => serverFactory.start())
.then(() => console.info('Server started: ', serverFactory.getConfig()))
.catch((reason) => console.error('Error en in server: ', reason));