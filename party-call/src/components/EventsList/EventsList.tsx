import React from "react";
import MediaCard from "../MediaCard/MediaCards";
import './EventsList.css'
import party from '../../assets/party.jpeg'

const events = [
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
  


const EventsList: React.FC = () => {
    return(
            <div className="events-list">
                {events.map((event) => (
                <MediaCard key={event.id} event={event} />
            ))}
            </div>
    )
}

export default EventsList;