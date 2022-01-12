
import EventRepository from "./repository";
import Event from "./models";

export default class EventService {

    /**
     * The event repository
     * @type {EventRepository}
     */
    _eventRepository;

    /**
     *
     * @param {EventRepository} eventRepository
     */
    constructor(eventRepository) {
        this._eventRepository = eventRepository;
    }

    /**
     * Return all events
     * @return {Event[]}
     */
    getEvents() {
        return this._eventRepository.getAll();
    }

    /**
     * Get the first upcomming event
     * @return {null | Event}
     */
    getFirstEvent() {        
        let events = this._eventRepository.getAll();
        let events_upcoming = events.filter(element => Date.now() < element.getStartTime());
        if (events_upcoming.length == 0)
            return null;
        return events_upcoming[0];
    }

    /**
     * Get the last upcomming event
     * @return {null | Event}
     */
    getLastEvent() {
        let events = this._eventRepository.getAll();                   
        let events_upcoming = events.filter(element => Date.now() < element.getStartTime());
        if (events_upcoming.length == 0)
            return null;
        return events_upcoming[events_upcoming.length-1]; 
    }

    /**
     * Get the duration event
     * @param {Date} startDate 
     * @param {Date} endDate 
     * @return {BigInteger} Duration in seconds
     */
    getDuration(startDate, endDate) {            
            return (endDate.valueOf() - startDate.valueOf()) / 1000;
    }

    /**
     * Get the longest event
     * @return {null | Event}
     */
    getLongestEvent() {
        let events = this._eventRepository.getAll();
        let events_duration = events.map(element => this.getDuration(element.getStartTime(), element.getEndTime()));
        let duration = 0;
        let index = null;        
        for (let i=0;i<events_duration.length;i++) {
            if (events_duration[i] > duration) {                
                duration = events_duration[i];
                index = i;            
            }
        }
        if (index == null)
            return null;
        return events[index];
    }

    /**
     * get the shortest event
     * @return {null | Event}
     */
    getShortestEvent() {
        return null; //TODO
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     * @return {Event[]}
     */
    hasEventOn(time) {
        let evts = this._eventRepository.getAll();
        return evts.filter(function (e) {
            return time >= e.getStartTime() && time <= e.getEndTime();
        });
    }

    // A implementer en TDD
    /**
     *
     * @param title
     * @return {null | Event}
     */
    getEventByTitle(title) {
        return null
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     */
    isLocationAvailable(time) {
    }

    /**
     * Get current events
     * @return {Event[]}
     */
    getCurrentEvents() {
        let now = Date.now();
        return this.hasEventOn(new Date(now));
    }
    
}