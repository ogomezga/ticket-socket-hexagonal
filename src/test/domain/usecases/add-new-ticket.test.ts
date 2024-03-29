import { Ticket } from '../../../domain/models/ticket';
import { AddNewTicket } from '../../../domain/usecases/add-new-ticket';
import { TicketHandlerInfo } from '../../../domain/models/ticket-handler-info';
import {TicketHandlerRepositoryMock} from '../../infrastructure/repositories/ticket-handler-repository-mock';

describe('Add new ticket test suite', () => {
    const ticketRepository = new TicketHandlerRepositoryMock();

    beforeEach(() => {
        ticketRepository.reset();
    });

    test('AddNewTicket must be a class that can be instantiated', () => {
        // When
        const addNewTicket = new AddNewTicket(ticketRepository);

        // Then
        expect(addNewTicket).toBeInstanceOf(AddNewTicket);
    });

    test('Given a request to add a new ticket into the system, it must be created correctly', () => {
        // Given
        ticketRepository.mockTicketHandlerInfo(new TicketHandlerInfo({
            latestTicket: 0,
            today: 13,
            tickets: [],
            lastFourTickets: [],
        }));
        const addNewTicket = new AddNewTicket(ticketRepository);

        // When
        const nestTicket = addNewTicket.addNewTicket();

        // Then
        const expectedNewTicket: Ticket = {
            numb: 1,
            desk: null,
        };
        expect(nestTicket).toEqual(expectedNewTicket);
    });

    test('Given a request to add a new ticket into the system, it must be added to the repository correctly', () => {
        // Given
        ticketRepository.mockTicketHandlerInfo(new TicketHandlerInfo({
            latestTicket: 0,
            today: 13,
            tickets: [],
            lastFourTickets: [],
        }));
        const addNewTicket = new AddNewTicket(ticketRepository);

        // When
        addNewTicket.addNewTicket();

        // Then
        const expectedSavedTicketHandlerInfo = new TicketHandlerInfo({
            latestTicket: 1,
            today: 13,
            tickets: [{
                numb: 1,
                desk: null,
            }],
            lastFourTickets: [],
        });
        ticketRepository.assertReadCurrentTicketHandlerInformationHaveBeenNthCalledWith(1);
        ticketRepository.assertSaveCurrentTicketHandlerInformationHavenBeenCalledTimes(1);
        ticketRepository.assertSaveCurrentTicketHandlerInformationHavenBeenCalledWith({ times: 1, ticketHandlerInfo: expectedSavedTicketHandlerInfo});
    });
});