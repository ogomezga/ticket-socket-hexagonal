import { TicketHandlerInfo } from '../../../domain/models/ticket-handler-info';
import { TicketRepository } from '../../../infrastructure/repositories/ticket-handler-repository';
import fs from 'fs';
import path from 'path';

jest.mock('fs');

describe('Test suite for the ticket handler repository', () => {

    function mockDate(day = 13) {
        jest.spyOn(global, 'Date').mockImplementation(() => ({
            getDate: () => day,
        }) as unknown as Date);
    }

    const fileName = 'data.json';
    const routeProjectRoot = path.join(__dirname, '..', '..', '..', '..');
    const dbConnectionPath = path.join(routeProjectRoot, 'db', fileName);

    beforeEach(() => {
        fs.writeFileSync = jest.fn();
        fs.readFileSync = jest.fn().mockImplementation(() => (JSON.stringify({
            latestTicket: 0,
            today: 13,
            tickets: [],
            lastFourTickets: [],
        })));
    });

    describe('Givena  request to init the repository', () => {
        test('TicketRepository must be a class that can be instantiated', () => {
            // Given & When
            const ticketRepository = new TicketRepository();

            // Then
            expect(ticketRepository).toBeInstanceOf(TicketRepository);
        });

        it('Should start the repository with the latest status available for the current day', () => {
            // Given
            mockDate();

            // When
            new TicketRepository();

            // Then
            expect(fs.writeFileSync).not.toHaveBeenCalled();
        });

        it('Should start the repository from scratch as it is a new day', () => {
            // Given
            mockDate(20);
            fs.readFileSync = jest.fn().mockImplementation(() => (JSON.stringify({
                latestTicket: 0,
                today: 13,
                tickets: [],
                lastFourTickets: [],
            })));

            // When
            new TicketRepository();

            // Then
            const expectedInitTicketHandlerInfo = {
                latestTicket: 0,
                today: 20,
                tickets: [],
                lastFourTickets: [],
            };
            expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
            expect(fs.writeFileSync).toHaveBeenNthCalledWith(1, dbConnectionPath, JSON.stringify(expectedInitTicketHandlerInfo));
        });
    });

    test('Given a request to save the ticket handler\'s info, it must save the informed data in the repository', () => {
        // Given
        mockDate();
        const ticketHandlerRepository = new TicketRepository();
        const expectedTicketHandlerInfo = {
            latestTicket: 0,
            today: 20,
            tickets: [],
            lastFourTickets: [],
        };

        // When
        ticketHandlerRepository.saveCurrentTicketHandlerInformation(new TicketHandlerInfo(expectedTicketHandlerInfo));

        // Then
        expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
        expect(fs.writeFileSync).toHaveBeenNthCalledWith(1, dbConnectionPath, JSON.stringify(expectedTicketHandlerInfo));
    });

    test('Given a request to read the ticket handler\'s info, it must read the data from the repository', () => {
        // Given
        mockDate();
        const ticketHandlerRepository = new TicketRepository();

        // When
        const result = ticketHandlerRepository.readCurrentTicketHandlerInformation();

        // Then
        const expectedTicketHandlerInfo = {
            latestTicket: 0,
            today: 13,
            tickets: [],
            lastFourTickets: [],
        };
        expect(fs.readFileSync).toHaveBeenNthCalledWith(1, dbConnectionPath, 'utf8');
        expect(result).toEqual(expectedTicketHandlerInfo);
    });
});

/*
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
*/