import React from "react";
import MediaCard from "../MediaCard/MediaCards";
import "./EventsList.css";
import party from "../../assets/party.jpeg";
import { useState, useEffect } from "react";
import { getEvents } from "../../services/Events.api";
import { Link } from "react-router-dom";
import "./EventsList.css";
import Decimal from "decimal.js";
import Loader from "../Loader/Loader";
import { Pagination } from "@mui/material";

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

const EventsList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 12;
  
  const totalPages = Math.ceil(events.length / eventsPerPage);
  
  const currEvents = events.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };


  useEffect(() => {
    (async () => {
      setIsLoading(true); // Start the loader
      try {
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
            image: event.imageUrl, 
            venue: event.venue,
            creator: event.creator,
            description: event.description,
          }));
          setEvents(cleanedEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false); // Stop the loader
      }
    })();
  }, []);

  const handleOpenEvent = (event: Event) => {
    const eventDetailsUrl = `/events/${event.title}`;
    window.open(eventDetailsUrl, "_blank");
  };

  return (
    <div>
      {isLoading ? (
        <Loader /> // Display the loader while loading
      ) : (
        <div className="event-list">
          {currEvents.map((event) => (
            <div key={event.id} onClick={() => handleOpenEvent(event)}>
              <MediaCard event={event} />
            </div>
        ))}
        </div>
      )}

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        size="large"
        className="pagination"
      />    
    </div>
  );
};

export default EventsList;
