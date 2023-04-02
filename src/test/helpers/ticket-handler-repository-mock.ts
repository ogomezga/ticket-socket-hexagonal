import { TicketHandler } from '../../domain/repositories/ticket-handler-repository';
import { TicketHandlerInfo } from '../../domain/models/ticket-handler-info';

export class TicketRepositoryMock implements TicketHandler {
    private ticketHandlerInfo: TicketHandlerInfo;
    private writeFileSync = jest.fn();
    private dbConnectionPath = 'D:\\Developer\\ProyectosNode\\ticket-socket-hexagonal\\db\\data.json';

    constructor() {
        this.ticketHandlerInfo = new TicketHandlerInfo({
            latestTicket: 0,
            today: new Date().getDate(),
            tickets: [],
            lastFourTickets: [],
        });
    }

    public saveCurrentTicketHandlerInformation(ticketHandlerInfo: TicketHandlerInfo): void {
        this.ticketHandlerInfo = new TicketHandlerInfo({ ...ticketHandlerInfo });
        this.writeFileSync(this.dbConnectionPath, JSON.stringify(this.ticketHandlerInfo));
    }

    public readCurrentTicketHandlerInformation(): TicketHandlerInfo {
        return this.ticketHandlerInfo;
    }

    public mockTicketHandlerInfo(mockedTicketHandlerInfo: TicketHandlerInfo): void {
        this.ticketHandlerInfo = mockedTicketHandlerInfo;
    }

    public expectSaveHasBeenCalledWith(ticketHandlerInfo: TicketHandlerInfo) {
        expect(this.writeFileSync).toHaveBeenCalledTimes(1);
        expect(this.writeFileSync).toHaveBeenNthCalledWith(1, this.dbConnectionPath, JSON.stringify(ticketHandlerInfo));
    }
}