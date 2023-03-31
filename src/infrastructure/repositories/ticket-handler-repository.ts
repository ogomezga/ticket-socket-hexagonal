import path from 'path';
import fs from 'fs';

import { TicketHandler, TicketHandlerInfo } from '../../domain/repositories/ticket-handler-repository';
import { Ticket } from '../../domain/ticket';

const DB_PATH = path.join(__dirname, '../../../db/data.json');

type Database = {
    latestTicket: number;
    today: number;
    tickets: Ticket[];
    lastFourTickets: Ticket[];
};

export class TicketRepository implements TicketHandler {
    private latestTicket: number;
    private today: number;
    private tickets: Ticket[];
    private lastFourTickets: Ticket[];

    constructor() {
        this.latestTicket = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFourTickets = [];

        this.init();
    }

    public toJson(): TicketHandlerInfo {
        return {
            latestTicket: this.latestTicket,
            today: this.today,
            tickets: this.tickets,
            lastFourTickets: this.lastFourTickets,
        };
    }

    public init(): void {
        const data: Database = JSON.parse(JSON.stringify(fs.readFileSync(DB_PATH, 'utf8')));

        if ( data.today === this.today ) {
            this.tickets  = data.tickets;
            this.latestTicket   = data.latestTicket;
            this.lastFourTickets = data.lastFourTickets;
        } else {                                // es otro día por lo que reinicio mi db.
            this.saveCurrentTicketHandlerInformation();
        }
    }

    public saveCurrentTicketHandlerInformation(): void {
        fs.writeFileSync(DB_PATH, JSON.stringify( this.toJson() ) );
    }

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
}