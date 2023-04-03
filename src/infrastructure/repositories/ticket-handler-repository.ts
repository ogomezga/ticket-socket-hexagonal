import path from 'path';
import fs from 'fs';

import TicketHandlerRepositoryInterface from '../../domain/repositories/ticket-handler-repository-interface';
import { TicketHandlerInfo } from '../../domain/models/ticket-handler-info';

const DB_PATH = path.join(__dirname, '../../../db/data.json');

export class TicketRepository implements TicketHandlerRepositoryInterface {
    private ticketHandlerInfo: TicketHandlerInfo;

    constructor() {
        this.ticketHandlerInfo = new TicketHandlerInfo({
            latestTicket: 0,
            today: new Date().getDate(),
            tickets: [],
            lastFourTickets: [],
        });

        this.init();
    }

    public saveCurrentTicketHandlerInformation(ticketHandlerInfo: TicketHandlerInfo): void {
        fs.writeFileSync(DB_PATH, JSON.stringify( ticketHandlerInfo ) );
    }

    public readCurrentTicketHandlerInformation(): TicketHandlerInfo {
        return JSON.parse(JSON.stringify(fs.readFileSync(DB_PATH, 'utf8')));
    }

    private init(): void {
        const data: TicketHandlerInfo = this.readCurrentTicketHandlerInformation();

        if ( data.today === this.ticketHandlerInfo.today ) {
            this.ticketHandlerInfo = new TicketHandlerInfo({
                latestTicket: data.latestTicket,
                today: data.today,
                tickets: data.tickets,
                lastFourTickets: data.lastFourTickets,
            });
        } else {
            this.saveCurrentTicketHandlerInformation(this.ticketHandlerInfo);
        }
    }
}