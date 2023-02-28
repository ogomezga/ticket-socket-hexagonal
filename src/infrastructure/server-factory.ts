import express from 'express';
import { Server } from 'http';

export class ServerFactory {
    private readonly port: string;
    private expressServer: express;
    private httpConnection: Server;

    constructor({ port }: { port: string}) {
        this.port = port;
    }

    public async createServer(): Promise<void> {
        this.expressServer = express();
        this.expressServer.use( express.static('public'));
    }

    public getPort(): string {
        return this.port;
    }

    public async start(): Promise<void> {
        const serverWillStart = new Promise((resolve) => (this.httpConnection = this.expressServer.listen(this.port, () => resolve(null))));
        await Promise.all([serverWillStart]);
    }

    public async stop(): Promise<void> {
        this.httpConnection.close();
    }
}