import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import './MoreEvents.css'
import part from "../../assets/bestparty.jpeg"
import Decimal from "decimal.js";
import { AccountCircle, Person } from "@mui/icons-material";

  
  interface Event {
    id: number;
    title: string;
    venue: {
      name : String
      address : String,
      state : String,
      zipCode : String
    };
    startDate: string;
    price: Decimal;
    startTime: string;
    endDate: string;
    endTime: string;
    image: string; // Assuming an image field is necessary
    description: string;
    creator: {
      userId: number,
      firstName: string,
      lastName: string
    }
  }

interface MoreEventProps {
    event: Event;
}

const MoreEvents: React.FC<MoreEventProps> = ({event}) => {

    const currentDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const startTimeString = event && event.startTime ? `${currentDate}T${event.startTime}` : 0; // Combine the date with the time
    const endTimeString = event && event.endTime ? `${currentDate}T${event.endTime}` : 0; // Combine the date with the time


    return(
        <Box className="more-events" sx={{ display: 'flex' }}>
            <Paper elevation={3} sx={{ padding: 2, width: '100%', maxWidth: 700, display: 'flex', alignItems: 'flex-start' }}>
                <Box sx={{ flex: 1 }}>
                <Typography variant="h5" component="p">
                    {event.title}
                </Typography>
                <Typography variant="body2" color="red" component="p">
                {new Date(event.startDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })} | {new Date(startTimeString).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,  // This will display time in 24-hour format
                })} - {new Date(endTimeString).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,  // This will display time in 24-hour format
                })}
                </Typography>
                <Typography variant="body2" component="p">
                    {event.venue.name} | {event.venue.state}
                </Typography>
                <Typography variant="body2" fontWeight="bold" component="p">
                    From ${Number(event.price).toFixed(2)}                     
                </Typography>
                <br></br>
                <Box className="creator-info">
                  <Person sx={{fontSize:"15px", color:"#015482"}}/>
                  <Typography fontSize="15px">    {event.creator.firstName} {event.creator.lastName}</Typography>
                </Box>
                </Box>
                <img src={event.image} className="more-events-img" alt="Event" style={{ marginLeft: '5px', maxWidth: '300px', height: '150px', paddingTop: '5' }} />
            </Paper>
        </Box>
    )
}

export default MoreEvents;

