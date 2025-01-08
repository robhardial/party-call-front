import React, { useEffect, useState } from 'react';
import './MyEvents.css';
import Decimal from 'decimal.js';
import { getEventsByEmail, getTicketsByUser } from '../../services/Events.api';
import { extractEmail } from '../../services/JWT';
import EventsCarousel from '../EventsCarousel/EventsCarousel';


interface Venue {
    id: number;
    name: string;
    location: string;
  }
  
  interface Event {
    id: number;
    title: string;
    venue: Venue;
    price: Decimal;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    creator: {
      userId: number;
      firstName: string;
      lastName: string;
    };
    image: string; 
    description: string;
  }

  interface Ticket{
    id: number,
    price: Decimal,
    event: Event,
    user: {
      userId: number;
      firstName: string;
      lastName: string;
    }
  }

const MyEvents: React.FC = () => {

    const[createdEvents, setCreatedEvents] = useState<Event[]>([]);
    const [tickets, setTickets] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const jwtToken = localStorage.getItem("jwtToken") || null;
    const email = jwtToken? extractEmail(jwtToken) : 'null';


    useEffect(() => {
        (async () => {
          setIsLoading(true); // Start the loader
          try {
            const data = await getEventsByEmail(email);
            if (data) {
              const cleanedEvents: Event[] = data.map((event: any) => ({
                id: event.eventId,
                title: event.title,
                price: event.price,
                startDate: event.startDate,
                startTime: event.startTime,
                endDate: event.endDate,
                endTime: event.endTime,
                image: event.imageUrl, 
                venue: event.venue,
                creator: event.creator,
                description: event.description,
              }));
              setCreatedEvents(cleanedEvents);
            }
          } catch (error) {
            console.error("Error fetching events:", error);
          } 
        })();
      }, []);

      useEffect(() => {
        (async () => {
          try {
            const data = await getTicketsByUser(email);
            if (data) {
              const eventsFromTickets: Event[] = data.map((ticket: any) => ({
                id: ticket.event.eventId,
                title: ticket.event.title,
                price: ticket.event.price,
                startDate: ticket.event.startDate,
                startTime: ticket.event.startTime,
                endDate: ticket.event.endDate,
                endTime: ticket.event.endTime,
                image: ticket.event.imageUrl, 
                venue: ticket.event.venue,
                creator: ticket.event.creator,
                description: ticket.event.description,
              }));
              console.log("Events from ticket:",eventsFromTickets);
              setTickets(eventsFromTickets);
            }
          } catch (error) {
            console.error("Error fetching events:", error);
          } 
        })();
      }, []);

    return(
      <div className="my-events">
      <div className="events-container">
        <section className="events-created">
          <h1 style={{ marginBottom: "45px" }}>Events Created</h1>
          <EventsCarousel eventList={createdEvents} />
        </section>
        <section className='events-attending'>
          <h1 style={{ marginBottom: "45px" }}>Events Attending</h1>
          <EventsCarousel eventList={tickets} />
        </section>
      </div>
    </div>
    
    )
}

export default MyEvents;