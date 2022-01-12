import Event from "../src/models";
import EventRepository from "../src/repository";
import EventService from "../src/services";
jest.mock("../src/repository");


describe("Event Service",()=> {

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        EventRepository.mockClear();
        EventRepository.mockImplementation(() => {
            return {
                getAll: () => fakeEvents.slice()
            }
        });        
    });

    let fakeEvents = [
        new Event(new Date('2019-12-17T03:24:00'),new Date('2019-12-17T13:24:00'),"Hello World","Campus Numerique","This is an hello world.."),        
        new Event(new Date('2018-12-17T03:24:00'),new Date('1995-12-17T03:24:00'),"First event","Campus Numerique","This is an hello world.."),
        new Event(new Date('2020-04-01T09:00:00'),new Date('2020-04-01T17:00:00'),"Unit test againt","Campus Numerique","This is an hello world.."),        
        new Event(new Date('2020-04-05T09:00:00'),new Date('2020-04-05T17:00:00'),"A new Event")
    ];

    test('getEvents shall call repository', async () => {
        let eventService = new EventService(new EventRepository());
        eventService.getEvents();
        expect(EventRepository).toHaveBeenCalledTimes(1);
    });

    test('getEvents shall return 4 result', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getEvents().length).toBe(4);
    });

    test('get the first element of events list', async () => {
        Date.now = jest.fn(() => new Date('2019-12-17T00:00:00').valueOf());        
        let eventService = new EventService(new EventRepository());                        
        expect(eventService.getFirstEvent()).toStrictEqual(fakeEvents[0]);
    });

    test('get the last element of events list', async () => {
        Date.now = jest.fn(() => new Date('2020-04-01T00:00:00').valueOf());
        let eventService = new EventService(new EventRepository());                        
        expect(eventService.getFirstEvent()).toStrictEqual(fakeEvents[2]); 
    });

    test('get an element in middle of events list', async () => {
        Date.now = jest.fn(() => new Date('2020-04-05T08:00:00').valueOf());
        let eventService = new EventService(new EventRepository());                        
        expect(eventService.getFirstEvent()).toStrictEqual(fakeEvents[fakeEvents.length - 1]);
    });

    test('get an element is not of events list', async () => {
        Date.now = jest.fn(() => new Date('2023-04-05T08:00:00').valueOf());
        let eventService = new EventService(new EventRepository());                        
        expect(eventService.getFirstEvent()).toStrictEqual(null);
    });

    test('get the last upcoming events return null', async () => {
        Date.now = jest.fn(() => new Date('2023-04-05T08:00:00').valueOf());    
        let eventService = new EventService(new EventRepository());                        
        expect(eventService.getLastEvent()).toStrictEqual(null);
    });

    test('get the last upcoming events', async () => {
        Date.now = jest.fn(() => new Date('2019-12-17T00:00:00').valueOf());    
        let eventService = new EventService(new EventRepository());                        
        expect(eventService.getLastEvent()).toStrictEqual(fakeEvents[fakeEvents.length-1]);
    });

    test('get the duration of an event', async () => {
        let eventService = new EventService(new EventRepository());                        
        expect(eventService.getDuration(new Date('2020-04-05T09:00:00'),new Date('2020-04-05T17:00:00'))).toBe(28800);
    });

    test('get the longest event', async () => {
        let eventService = new EventService(new EventRepository());                        
        expect(eventService.getLongestEvent()).toStrictEqual(fakeEvents[0]);
    });
});