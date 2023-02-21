import { ServerFactory } from './infrastructure/server-factory';

const serverFactory = new ServerFactory({ port: 3000});

serverFactory
.createServer()
.then(async() => await serverFactory.start)
.then(() => console.info('Server started: ', serverFactory.getConfig()))
.catch((reason) => console.error('Error en in server: ', reason));