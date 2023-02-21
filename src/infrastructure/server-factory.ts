import express from 'express';
import * as http from 'http';

export class ServerFactory {
    private readonly port: number;
    private expressServer: express;

    constructor({ port }: { port: number}) {
        this.port = port;
    }

    public async createServer() {
        this.expressServer = express();
    }

    public getConfig(): number {
        return this.port;
    };

    public getExpressApp(): express {
        return this.expressServer;
    }

    public async start() {
        let httpConnection: http.Server;
        const serverWillStart = new Promise<void>((resolve) => (httpConnection = this.expressServer.listen(this.port, () => resolve())));
        await Promise.all([serverWillStart]);
    };
}