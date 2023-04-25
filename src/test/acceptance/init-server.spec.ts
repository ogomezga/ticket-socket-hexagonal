import { ServerFactory } from '../../infrastructure/server-factory';

describe('test suite to check service startup', () => {
    let serverFactory: ServerFactory;

    afterAll(async () => {
        await serverFactory.stop();
    });

    test('Given a start request when the service is started then it Should be raised on port 3000', async () => {
        // Given
        serverFactory = new ServerFactory();

        // When
        await Promise.all([serverFactory.createServer({ port: '3000' }), serverFactory.start()]);

        // Then
        expect(serverFactory.getPort()).toEqual('3000');
    });
});