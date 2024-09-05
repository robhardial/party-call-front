import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import './EventDetails.css'

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


const EventDetails: React.FC = () => {

    const { eventName } = useParams<{ eventName: string }>(); // Capture the URL parameter
    const location = useLocation();
    const event = location.state?.event as Event | undefined;

    if (!event) {
        return (
          <div>
            <h2>Event not found</h2>
            <p>It seems like you accessed this page without the required event data.</p>
          </div>
        );
      }
    return(
        <div>
        <Box
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '300px',
        backgroundImage: `url(${event.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        maxWidth: '80%',
        color: 'white',
        textAlign: 'center',
        padding: '0px',
        mb: 2, // Margin-bottom for spacing below the banner
        borderRadius: '16px', // Set border radius for curved corners
      }}
    >
        </Box>
        
        <Box sx={{display: "flex",
            flexDirection: 'column',
            paddingLeft: '30px',
            alignItems: 'left',
            "& > *": {
            margin: 0, // Reset margin for all child elements
            padding: 0, // Optional: Reset padding if needed
          },
        }}>
            <div>
                <h3>{event.startDate}</h3>
                <h1 style={{fontSize:'80px', margin:'0'}}>{event.title}</h1>
            </div>
            <p>Time: {event.startTime}</p>
            <p>Venue: {event.venue.name}</p>
            <p>Description: {event.description}</p>
        </Box>
        </div>
    )
}

export default EventDetails;