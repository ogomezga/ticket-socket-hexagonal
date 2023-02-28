import { ServerFactory } from '../../infrastructure/server-factory';
import * as dotenv from 'dotenv';


describe('test suite to check service startup', () => {
    let serverFactory: ServerFactory;

    beforeAll(() => {
        dotenv.config();
    });

    afterAll(async () => {
        await serverFactory.stop();
    });

    test('Given a start request when the service is started then it Should be raised on port 3000', async () => {
        // Given
        serverFactory = new ServerFactory({ port: process.env.PORT});

        // When
        await Promise.all([serverFactory.createServer(), serverFactory.start()]);

        // Then
        expect(serverFactory.getPort()).toEqual('3000');
    });
});