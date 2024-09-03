import React from "react";
import MediaCard from "../MediaCard/MediaCards";
import './EventsList.css'
import party from '../../assets/party.jpeg'
import { useState, useEffect } from "react";
import { getEvents } from '../../services/Events.api'


/*const events = [
    {
      id: 1,
      title: 'Party at the Beach',
      startDate: '2024-09-01',
      startTime: '14:00',
      image: party,
      venue: {
        id: 1,
        name: 'Beach Venue',
        location: 'Malibu, CA',
      }
    },
    {
      id: 2,
      title: 'Music Festival',
      startDate: '2024-10-15',
      startTime: '18:00',
      image: party,
      venue: {
        id: 2,
        name: 'Festival Grounds',
        location: 'Austin, TX',
      }
    },
    {
        id: 1,
        title: 'Party at the Beach',
        startDate: '2024-09-01',
        startTime: '14:00',
        image: party,
        venue: {
          id: 1,
          name: 'Beach Venue',
          location: 'Malibu, CA',
        }
      },
      {
        id: 2,
        title: 'Music Festival',
        startDate: '2024-10-15',
        startTime: '18:00',
        image: party,
        venue: {
          id: 2,
          name: 'Festival Grounds',
          location: 'Austin, TX',
        }
      },
      {
        id: 1,
        title: 'Party at the Beach',
        startDate: '2024-09-01',
        startTime: '14:00',
        image: party,
        venue: {
          id: 1,
          name: 'Beach Venue',
          location: 'Malibu, CA',
        }
      },
      {
        id: 2,
        title: 'Music Festival',
        startDate: '2024-10-15',
        startTime: '18:00',
        image: party,
        venue: {
          id: 2,
          name: 'Festival Grounds',
          location: 'Austin, TX',
        }
      },
      {
        id: 1,
        title: 'Party at the Beach',
        startDate: '2024-09-01',
        startTime: '14:00',
        image: party,
        venue: {
          id: 1,
          name: 'Beach Venue',
          location: 'Malibu, CA',
        }
      },
      {
        id: 2,
        title: 'Music Festival',
        startDate: '2024-10-15',
        startTime: '18:00',
        image: party,
        venue: {
          id: 2,
          name: 'Festival Grounds',
          location: 'Austin, TX',
        }
      },
    // Add more events here
  ];
 */ 

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
              image: party, // Replace with actual image source
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
                <MediaCard key={event.id} event={event} />
            ))}
            </div>
    )
}

export default EventsList;