import React, { useState } from "react";
import { Paper, Box, Button } from "@mui/material";
import "./GetTickets.css";
import Decimal from "decimal.js";
import { createTicket } from "../../services/Events.api";
import { extractEmail } from "../../services/JWT";

interface Event {
  id: number;
  title: string;
  venue: {
    name: String;
    address: String;
    state: String;
    zipCode: String;
  };
  price: Decimal;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  image: string; 
  description: string;
  creator: {
    firstName: string;
    lastName: string;
    userId : number;
  };
}

interface Ticket{
  price: Decimal,
  eventId: number,
  userId: string
}

interface GetTicketsProps {
  event: Event;
}

const GetTickets: React.FC<GetTicketsProps> = ({ event }) => {

  const jwtToken = localStorage.getItem("jwtToken") || null;
  const email = jwtToken? extractEmail(jwtToken) : 'null';

  const [attending, setAttending] = useState(false);


  const attendEvent = async () => {
      try{
        const ticket = {
          price : event.price,
          eventId : event.id,
          userId : email? email : "samplemail@gmail.com"
        };

        console.log(ticket);

        const response = await createTicket(ticket);
        console.log('Event created:', response);
        setAttending(true);
      }catch(error){
        console.error("Error: ", error);
        
      }
  };

  const unattendEvent = async () => {

  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 458,
            height: 158,
          },
        }}
      >
        <Paper elevation={3}>
          <Box p={2} className="ticket-box">
            <h2>${Number(event.price).toFixed(2)}</h2>
            {attending ? (<button className="attending-btn" onClick={unattendEvent}>Attending</button> ) :
            (<button className="ticket-btn" onClick={attendEvent}>Attend</button>)
}
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default GetTickets;
