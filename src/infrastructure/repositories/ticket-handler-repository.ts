import path from 'path';
import fs from 'fs';

import { TicketHandler } from '../../domain/repositories/ticket-handler-repository';
import { TicketHandlerInfo } from '../../domain/models/ticket-handler-info';

const DB_PATH = path.join(__dirname, '../../../db/data.json');

export class TicketRepository implements TicketHandler {
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
        } else {                                // es otro día por lo que reinicio mi db.
            this.saveCurrentTicketHandlerInformation(this.ticketHandlerInfo);
        }
    }
}

/*
// TODO tal vez, esto debería estar en un caso de uso?
    public addNewTicket(): Ticket {
        this.latestTicket += 1 ;

        const newTicket: Ticket = {
            numb: this.latestTicket,
            desk: null,
        };
        this.tickets.push( newTicket );

        this.saveCurrentTicketHandlerInformation();
        return newTicket;
    }

    // TODO sacar esto a un caso de uso
    assingTicket( desktop: number ){

        if ( this.tickets.length === 0 ) {
            return null;
        }

        const ticket = this.tickets.shift();
        ticket.desk = desktop;

        this.lastFourTickets.unshift( ticket );

        if ( this.lastFourTickets.length > 4 ) {
            this.lastFourTickets.splice(-1, 1);
        }

        this.saveCurrentTicketHandlerInformation();
        return ticket;
    }
*/