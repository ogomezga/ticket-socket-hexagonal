import { Properties } from '../../shared/intefaces';
import { Ticket } from './ticket';

export class TicketHandlerInfo {
    readonly latestTicket: number;
    readonly today: number;
    readonly tickets: Ticket[];
    readonly lastFourTickets: Ticket[];

    constructor ({ latestTicket, today, tickets, lastFourTickets }: Properties<TicketHandlerInfo>) {
        this.latestTicket = latestTicket;
        this.today = today;
        this.tickets = tickets;
        this.lastFourTickets = lastFourTickets;
    }

    public increaseLatestTicket(): TicketHandlerInfo {
        return new TicketHandlerInfo({
            ...this,
            latestTicket: this.latestTicket + 1,
        });
    }

    public addNewTicket(ticket: Ticket): TicketHandlerInfo {
        return new TicketHandlerInfo({
            ...this,
            tickets: this.tickets.push( ticket ),
        });
    }

    public isThereTicketToAttend(): boolean {
        return this.tickets.length > 0;
    }

    public getFirstTicketToBeAttended(): Ticket {
        return this.tickets.shift();
    }

    public addTicketToTheLastFourAttendedTickets(attendedTicket: Ticket): void {
        this.lastFourTickets.unshift( attendedTicket );

        if ( this.lastFourTickets.length > 4 ) {
            this.lastFourTickets.splice(-1, 1);
        }
    }
}