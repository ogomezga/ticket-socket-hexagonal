import express from 'express';
import {Server as SocketServer, Socket} from 'socket.io';
import { Server, createServer } from 'http';
import {resolveDependency} from './dependency-injection';

export class ServerFactory {
    private port: string;
    private expressServer: express;
    private httpConnection: Server;
    private socketServer: SocketServer;

    public async createServer({ port = process.env.PORT }: { port: string}): Promise<void> {
        this.expressServer = express();
        this.httpConnection = createServer(this.expressServer);
        this.socketServer = new SocketServer(this.httpConnection);
        this.expressServer.use( express.static('public'));
        this.port = port;
    }

    public getPort(): string {
        return this.port;
    }

    public async start(): Promise<void> {
        const serverWillStart = new Promise((resolve) => (this.httpConnection.listen(this.port, () => resolve(null))));
        await Promise.all([serverWillStart]);
    }

    public onSocketConnection(): void {
        const lastTicketEmitter = resolveDependency('lastTicketEmitter');
        const pendingTicketsEmitter = resolveDependency('pendingTicketsEmitter');
        const lastFourHandleTicketsEmitter = resolveDependency('lastFourHandleTicketsEmitter');
        const newTicketListener = resolveDependency('newTicketListener');
        const handleTicketListener = resolveDependency('handleTicketListener');
        const socketClient = resolveDependency('socketClient');

        socketClient.registerSocketServer(this.socketServer);

        this.socketServer.on('connection', (socket: Socket) => {
            socket.on('siguiente-ticket', (payload, callback) => {
                newTicketListener.execute(callback);
            });

            socket.on('atender-ticket', ({ escritorio }, callback) => {
                handleTicketListener.execute({ escritorio, callback });
            });

            lastTicketEmitter.emit();
            pendingTicketsEmitter.emit();
            lastFourHandleTicketsEmitter.emit();
        });
    }

    public async stop(): Promise<void> {
        this.httpConnection.close();
    }
}