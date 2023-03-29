import { Ticket } from '../../../domain/ticket';
import { TicketRepository } from '../../../infrastructure/repositories/ticket-handler-repository';
import fs from 'fs';

jest.mock('fs');

describe('Test suite for the ticket handler repository', () => {

    function mockDate(day = 13) {
        jest.spyOn(global, 'Date').mockImplementation(() => ({
            getDate: () => day,
        }) as unknown as Date);
    }

    beforeEach(() => {
        fs.writeFileSync = jest.fn();
        fs.readFileSync = jest.fn().mockImplementation(() => ({
            latestTicket: 0,
            today: 13,
            tickets: [],
            lastFourTickets: [],
        }));
    });

    test('Should return all the current information manage by the ticket handler', () => {
        // Given
        mockDate();
        const ticketHandlerRepository = new TicketRepository();

        // When
        const result = ticketHandlerRepository.toJson();

        // Then
        const expectedCurrentTicketHandlerInfo = {
            latestTicket: 0,
            today: 13,
            tickets: [],
            lastFourTickets: [],
        };
        expect(result).toEqual(expectedCurrentTicketHandlerInfo);
    });

    describe('Givena  request to init the repository', () => {
        it('Should start the repository with the latest status available for the current day', () => {
            // Given
            mockDate();
            const ticketHandlerRepository = new TicketRepository();

            // When
            ticketHandlerRepository.init();

            // Then
            const expectedInitTicketHandlerInfo = {
                latestTicket: 0,
                today: 13,
                tickets: [],
                lastFourTickets: [],

            };
            const result = ticketHandlerRepository.toJson();
            expect(result).toEqual(expectedInitTicketHandlerInfo);
        });

        it('Should start the repository from scratch as it is a new day', () => {
            // Given
            mockDate(20);
            const ticketHandlerRepository = new TicketRepository();
            fs.readFileSync = jest.fn().mockImplementation(() => ({
                latestTicket: 0,
                today: 20,
                tickets: [],
                lastFourTickets: [],
            }));

            // When
            ticketHandlerRepository.init();

            // Then
            const expectedInitTicketHandlerInfo = {
                latestTicket: 0,
                today: 20,
                tickets: [],
                lastFourTickets: [],

            };
            const result = ticketHandlerRepository.toJson();
            expect(result).toEqual(expectedInitTicketHandlerInfo);
        });
    });

    it('Should save the current status of the ticket hundler repository', () => {
        // Given
        mockDate();
        const ticketHandlerRepository = new TicketRepository();

        // When
        ticketHandlerRepository.saveCurrentTicketHandlerInformation();

        // Then
        expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    });

    it('Should add a new ticket to the repository', () => {
        // Given
        const ticketHandlerRepository = new TicketRepository();

        // When
        const result = ticketHandlerRepository.addNewTicket();

        // Then
        const expectedNewTicket: Ticket = {
            numb: 1,
            desk: null,
        };
        expect(result).toEqual(expectedNewTicket);
    });

    describe('Given a request to service a ticket', () => {
        it('Should return a ticket with an assigned desk', () => {
            // Given
            const desktop = 0;
            mockDate();
            fs.readFileSync = jest.fn().mockImplementation(() => ({
                latestTicket: 0,
                today: 13,
                tickets: [{
                    numb: 1,
                    desk: desktop,
                }],
                lastFourTickets: [],
            }));
            const ticketHandlerRepository = new TicketRepository();

            // When
            const result = ticketHandlerRepository.assingTicket(desktop);

            // Then
            const expectedNewTicket: Ticket = {
                numb: 1,
                desk: desktop,
            };
            expect(result).toEqual(expectedNewTicket);
        });

        it('Should return null if there are no tickets available to service', () => {
            // Given
            const desktop = 0;
            mockDate(20);
            const ticketHandlerRepository = new TicketRepository();

            // When
            const result = ticketHandlerRepository.assingTicket(desktop);

            // Then
            expect(result).toBeNull();
        });
    });
});