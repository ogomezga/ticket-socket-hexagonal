import TicketHandlerRepositoryInterface from '../../../domain/repositories/ticket-handler-repository-interface';
import {TicketHandlerInfo} from '../../../domain/models/ticket-handler-info';
import path from 'path';

export class TicketHandlerRepositoryMock implements TicketHandlerRepositoryInterface {
    private readonly writeFileSyncMock = jest.fn();
    private readonly readFileSyncMock = jest.fn();
    private readonly dbPath = path.join(__dirname, '../../../../db/data.json');
    private readonly encoding = 'utf8';
    private ticketHandlerInfo: TicketHandlerInfo = {} as TicketHandlerInfo;

    saveCurrentTicketHandlerInformation (ticketHandlerInfo: TicketHandlerInfo): void {
        this.writeFileSyncMock(this.dbPath, JSON.stringify( ticketHandlerInfo ));
    }

    readCurrentTicketHandlerInformation(): TicketHandlerInfo {
        this.readFileSyncMock(this.dbPath, this.encoding);
        return this.ticketHandlerInfo;
    }

    assertSaveCurrentTicketHandlerInformationHavenBeenCalledTimes(times: number): void {
        expect(this.writeFileSyncMock).toHaveBeenCalledTimes(times);
    }

    assertSaveCurrentTicketHandlerInformationHavenBeenCalledWith({ times, ticketHandlerInfo }:{times: number; ticketHandlerInfo: TicketHandlerInfo }): void {
        expect(this.writeFileSyncMock).toHaveBeenNthCalledWith(times, this.dbPath, JSON.stringify( ticketHandlerInfo ));
    }

    assertReadCurrentTicketHandlerInformationHaveBeenNthCalledWith(times: number): void {
        expect(this.readFileSyncMock).toHaveBeenNthCalledWith(times, this.dbPath, this.encoding);
    }

    mockTicketHandlerInfo(ticketHandlerInfo: TicketHandlerInfo): void {
        this.ticketHandlerInfo = ticketHandlerInfo;
    }

    reset(): void {
        this.writeFileSyncMock.mockReset();
        this.readFileSyncMock.mockReset();
        this.ticketHandlerInfo = {} as TicketHandlerInfo;
    }
}