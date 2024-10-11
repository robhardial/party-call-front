import React from "react";
import MediaCard from "../MediaCard/MediaCards";
import './EventsList.css'
import party from '../../assets/party.jpeg'
import { useState, useEffect } from "react";
import { getEvents } from '../../services/Events.api'
import { Link } from "react-router-dom";
import './EventsList.css'



  interface Venue {
    id: number;
    name: string;
    location: string;
  }
  
  interface Event {
    id: number;
    title: string;
    venue: Venue;
    startDate: string;
    startTime: string;
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
              startDate: event.startDate,
              startTime: event.startTime,
              image: event.imageUrl, // Replace with actual image source
              venue: event.venue,
              description: event.description,
            }));
            setEvents(cleanedEvents);
          }
        })();
      }, []);

    return(
            <div className="events-list">
                {events.map((event) => (
                  <Link to={`/events/${event.title}`} state={{ event }} className="link-reset">
                <MediaCard key={event.id} event={event} />
                </Link>
            ))}
            </div>
    )
}

export default EventsList;