import React, { useEffect, useState } from "react";
import {
  Link,
  unstable_DataStrategyFunctionArgs,
  useLocation,
  useParams,
} from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";
import "./EventDetails.css";
import { AccountCircle, CalendarMonth, LocationOn } from "@mui/icons-material";
import GetTickets from "../GetTickets/GetTickets";
import MoreEvents from "../MoreEvents/MoreEvents";
import { getEventsByUserId, getEventByTitle } from "../../services/Events.api";
import Decimal from "decimal.js";
import Loader from "../Loader/Loader";

interface Venue {
  id: number;
  name: string;
  location: string;
}

interface Event {
  id: number;
  title: string;
  venue: {
    name: String;
    address: String;
    state: String;
    zipCode: String;
  };
  startDate: string;
  price: Decimal;
  startTime: string;
  endDate: string;
  endTime: string;
  image: string; 
  description: string;
  creator: {
    userId: number;
    firstName: string;
    lastName: string;
  };
}

const EventDetails: React.FC = () => {
  const { eventName = " " } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const startTimeString =
    event && event.startTime ? `${currentDate}T${event.startTime}` : 0; 
  const endTimeString =
    event && event.endTime ? `${currentDate}T${event.endTime}` : 0; 

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try{
      const data = await getEventsByUserId(event?.creator.userId);
      if (data) {
        const cleanedEvents: Event[] = data.map((event: any) => ({
          id: event.eventId,
          price: event.price,
          title: event.title,
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
    }catch(error){
      console.error("Error fetching event:", error);
    } finally {
      setIsLoading(false); // Stop the loader
    }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      console.log(eventName);
      const data = await getEventByTitle(eventName);
      if (data) {
        const cleanedEvent: Event = {
          id: data.eventId,
          price: data.price,
          title: data.title,
          startDate: data.startDate,
          startTime: data.startTime,
          endDate: data.endDate,
          endTime: data.endTime,
          image: data.imageUrl,
          venue: data.venue,
          creator: data.creator,
          description: data.description,
        };
        setEvent(cleanedEvent);
        console.log(cleanedEvent);
      }
    })();
  }, [eventName]);

  const handleOpenEvent = (event: Event) => {
    const eventDetailsUrl = `/events/${event.title}`;
    window.open(eventDetailsUrl, "_blank");
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!event) {
    return (
      <div>
        <h2>Event not found</h2>
        <p>
          It seems like you accessed this page without the required event data.
        </p>
      </div>
    );
  }
  return (
    <div className="full-page">
      <Box
        className="event-box"
        sx={{ backgroundImage: `url(${event.image})` }}
      ></Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: "100px",
          alignItems: "left",
          "& > *": {
            margin: 0, // Reset margin for all child elements
            padding: 0, 
          },
        }}
      >
        <div>
          <h3 className="event-date">
            {new Date(event.startDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
          <h1 className="page-title">{event.title}</h1>
        </div>
        <br></br>
        <h2>Date and time</h2>
        <Box className="date-box" display={"flex"} alignItems={"center"}>
          <CalendarMonth sx={{ fontSize: "19px" }} />
          <p>
            {new Date(event.startDate).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}{" "}
            |{" "}
            {new Date(startTimeString).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true, 
            })}{" "}
            -{" "}
            {new Date(endTimeString).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true, // This will display time in 24-hour format
            })}{" "}
            EST
          </p>
        </Box>
        <br></br>
        <br></br>
        <br></br>
        <h2>Location</h2>
        <br></br>
        <Box className="location-box" display={"flex"} alignItems={"center"}>
          <LocationOn sx={{ fontSize: "19px" }} />
          <p>{event.venue.name}</p>
        </Box>
        <p style={{ marginLeft: "20px", letterSpacing: '.5px', color: 'grey' }}>
          {event.venue.address}, {event.venue.state}, {event.venue.zipCode}
        </p>
        <br></br>
        <br></br>
        <br></br>
        <h2>About this event</h2>
        <br></br>
        <div style={{ whiteSpace: "pre-wrap", color: 'grey' }}>
          {event.description} {/* Rendered with preserved new lines */}
        </div>
        <br></br>
        <br></br>
        <br></br>
        <h2>Organized by</h2>
        <br></br>
        <Box
          className="creator-details"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1, 
              paddingRight: 25,
              paddingTop: 3,
              paddingBottom: 3,
            },
          }}
        >
          <Paper elevation={3} sx={{background:'#D3D3D3'}}>
            <Box className="creator-box">
              <AccountCircle
                sx={{ fontSize: "80px", color: "#015482" }}
              ></AccountCircle>
              <Typography fontSize="30px">
                {" "}
                {event.creator.firstName} {event.creator.lastName}
              </Typography>
            </Box>
          </Paper>
        </Box>

        <br></br>
        <br></br>
        <br></br>

        <h2>More events from this organizer</h2>
        <br></br>
        <div className="events-list">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => handleOpenEvent(event)}
              className="link-reset"
            >
              <MoreEvents key={event.id} event={event} />
            </div>
          ))}
        </div>

        <Box
          sx={{
            position: "fixed",
            bottom: 200, 
            right: 50, 
            zIndex: 1000, 
          }}
        >
          <GetTickets event={event} />
        </Box>
      </Box>
    </div>
  );
};

export default EventDetails;
