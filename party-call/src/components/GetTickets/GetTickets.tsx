import React from "react"
import { Paper, Box } from "@mui/material";
import './GetTickets.css'
import Decimal from "decimal.js";

interface Event {
    id: number;
    title: string;
    venue: {
      name : String
      address : String,
      state : String,
      zipCode : String
    };
    price: Decimal;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    image: string; // Assuming an image field is necessary
    description: string;
    creator: {
      firstName: string,
      lastName: string
    }
  }

  interface GetTicketsProps {
    event: Event; 
  }

const GetTickets: React.FC<GetTicketsProps> = ({event}) => {

    return(
        <div>
        <Box
            sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
                m: 1,
                width: 458,
                height: 158,
            },
            }}
        >
            <Paper elevation={3}>
            <Box p={2} className='ticket-box'>
                <h2>${Number(event.price).toFixed(2)}</h2>
                <button className="ticket-btn">Get tickets</button>
            </Box>
            </Paper>
        </Box>
        </div>


    )
}

export default GetTickets;