import React from "react";
import MediaCard from "../MediaCard/MediaCards";
import './EventsList.css'
import party from '../../assets/party.jpeg'
import { useState, useEffect } from "react";
import { getEvents } from '../../services/Events.api'
import { Link } from "react-router-dom";
import './EventsList.css'
import Decimal from 'decimal.js';



  interface Venue {
    id: number;
    name: string;
    location: string;
  }
  
  interface Event {
    id: number;
    title: string;
    venue: Venue;
    price: Decimal,
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    creator: {
      userId: number,
      firstName: string,
      lastName: string
    }
    image: string; // Assuming an image field is necessary
    description: string;
  }

const EventsList: React.FC = () => {

    const [events, setEvents] = useState<Event[]>([])


    useEffect(() => {
        (async () => {
          const data = await getEvents();
          if (data) {
            const cleanedEvents: Event[] = data.map((event: any) => ({
              id: event.eventId,
              title: event.title,
              price: event.price,
              startDate: event.startDate,
              startTime: event.startTime,
              endDate: event.endDate,
              endTime: event.endTime,
              image: event.imageUrl, // Replace with actual image source
              venue: event.venue,
              creator: event.creator,
              description: event.description,
            }));
            setEvents(cleanedEvents);
          }
        })();
      }, []);

      const handleOpenEvent = (event: Event) => {
        const eventDetailsUrl = `/events/${event.title}`;
        window.open(eventDetailsUrl, '_blank');
      };

    return(
        <div className="event-list">
            {events.map((event) => (
              <div key={event.id} onClick={() => handleOpenEvent(event)}>
                <MediaCard event={event} />
              </div>
            ))}
        </div>
    )
}

export default EventsList;