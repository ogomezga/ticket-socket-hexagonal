import { Ticket } from '../../../domain/models/ticket';
import { TicketHandlerInfo } from '../../../domain/models/ticket-handler-info';
import { AssignTicket } from '../../../domain/usecases/assign-ticket';
import { TicketRepositoryMock } from '../../helpers/ticket-handler-repository-mock';

jest.mock('fs');

describe('Assign Ticket test suite', () => {

    test('AssignTicket must be a class that can be instantiated', () => {
        // Given
        const ticketRepository = new TicketRepositoryMock();

        // When
        const assignTicket = new AssignTicket(ticketRepository);

        // Then
        expect(assignTicket).toBeInstanceOf(AssignTicket);
    });

    test('Given a request to assign a ticket, it must be assigned to a desk correctly', () => {
        // Given
        const ticketRepository = new TicketRepositoryMock();
        ticketRepository.mockTicketHandlerInfo(new TicketHandlerInfo({
            latestTicket: 1,
            today: 13,
            tickets: [{
                numb: 1,
                desk: null,
            }],
            lastFourTickets: [],
        }));
        const assignTicket = new AssignTicket(ticketRepository);

        // When
        const assignedTicket = assignTicket.assignTicket(1);

        // Then
        const expectedAssignedTicket: Ticket = {
            numb: 1,
            desk: 1,
        };
        expect(assignedTicket).toEqual(expectedAssignedTicket);
    });

    test('Given a request to assign a ticket, If there are no tickets to attend it must return null', () => {
        // Given
        const ticketRepository = new TicketRepositoryMock();
        const assignTicket = new AssignTicket(ticketRepository);

        // When
        const assignedTicket = assignTicket.assignTicket(1);

        // Then
        expect(assignedTicket).toBeNull();
    });

    test('Given a request to assign a ticket, it must be assigned and added to the repository correctly', () => {
        // Given
        const ticketRepository = new TicketRepositoryMock();
        ticketRepository.mockTicketHandlerInfo(new TicketHandlerInfo({
            latestTicket: 1,
            today: 13,
            tickets: [{
                numb: 1,
                desk: null,
            }],
            lastFourTickets: [],
        }));
        const assignTicket = new AssignTicket(ticketRepository);

        // When
        assignTicket.assignTicket(1);

        // Then
        const ticket = {
            numb: 1,
            desk: 1,
        };
        const expectedSavedTicketHandlerInfo = new TicketHandlerInfo({
            latestTicket: 1,
            today: 13,
            tickets: [],
            lastFourTickets: [ticket],
        });
        ticketRepository.expectSaveHasBeenCalledWith(expectedSavedTicketHandlerInfo);
    });

    test('Given a request to assign a ticket, it already exists tickets have been attended it must be refreshed the list correctly', () => {
        // Given
        const ticketRepository = new TicketRepositoryMock();
        ticketRepository.mockTicketHandlerInfo(new TicketHandlerInfo({
            latestTicket: 5,
            today: 13,
            tickets: [{
                numb: 5,
                desk: null,
            }],
            lastFourTickets: [
                {
                    numb: 1,
                    desk: 1,
                },
                {
                    numb: 2,
                    desk: 1,
                },
                {
                    numb: 3,
                    desk: 1,
                },
                {
                    numb: 4,
                    desk: 1,
                },
            ],
        }));
        const assignTicket = new AssignTicket(ticketRepository);

        // When
        assignTicket.assignTicket(1);

        // Then
        const expectedSavedTicketHandlerInfo = new TicketHandlerInfo({
            latestTicket: 5,
            today: 13,
            tickets: [],
            lastFourTickets: [
                {
                    numb: 5,
                    desk: 1,
                },
                {
                    numb: 1,
                    desk: 1,
                },
                {
                    numb: 2,
                    desk: 1,
                },
                {
                    numb: 3,
                    desk: 1,
                },
            ],
        });
        ticketRepository.expectSaveHasBeenCalledWith(expectedSavedTicketHandlerInfo);
    });
});