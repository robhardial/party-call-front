import React, { useEffect, useState } from "react";
import { Paper, Box, Button } from "@mui/material";
import "./GetTickets.css";
import Decimal from "decimal.js";
import { createTicket, deleteTicket, getTicketsByUser, deleteEventAndTickets } from "../../services/Events.api";
import { extractEmail } from "../../services/JWT";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setTickets } from "../../slices/eventSlice";
import { useNavigate } from "react-router";

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
    email : string;
  };
}

interface GetTicketsProps {
  event: Event;
}

const GetTickets: React.FC<GetTicketsProps> = ({ event }) => {

  const jwtToken = localStorage.getItem("jwtToken") || null;
  const email = jwtToken? extractEmail(jwtToken) : 'null';
  const eventEmail = event.creator.email;

  const dispatch: AppDispatch = useDispatch();
  const tickets = useSelector((state: RootState) => state.event.tickets);

  const [attending, setAttending] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const[showModal, setShowModal] = useState(false);
  const price = Number(event.price).toFixed(2);
  const userEvent = email === eventEmail;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      if (email) {
        try {
          const userTickets = await getTicketsByUser(email);
          dispatch(setTickets(userTickets));
        } catch (error) {
          console.error("Error fetching tickets:", error);
        }
      }
    };

    fetchTickets
    ();
  }, [email, dispatch]);

  useEffect(() => {
    // Check if the user has a ticket for the current event
    const ticket = tickets.find((ticket) => ticket.event.eventId === event.id);
    if (ticket) {
      setAttending(true);
      setTicketId(ticket.ticketId); // Assuming `ticketId` is part of the ticket object
    } else {
      setAttending(false);
      setTicketId(null);
    }
  }, [tickets, event.id]);

  const attendEvent = async () => {

      if(jwtToken == null){
        navigate("/login");
      }

      try{
        const ticket = {
          price : event.price,
          eventId : event.id,
          userId : email? email : "samplemail@gmail.com"
        };

        const response = await createTicket(ticket);
        console.log('Event created:', response);
        setAttending(true);
      }catch(error){
        console.error("Error: ", error);
        
      }
  };

  const unattendEvent = async () => {
    try{

      if(ticketId != null){
      const response = await deleteTicket(ticketId);
      console.log("Response: ",response);

      if(response){
        setAttending(false);
        console.log(attending);
      }
    }
    }catch(error){
      console.error(error);
    }

  }

  const showDeleteConfirmation = async () => {
    setShowModal(true);
  }

  const confirmDeleteEvent = async(eventId : number) => {
    try{
      const response = await deleteEventAndTickets(eventId);
      console.log("Response: ",response);
      navigate("/");
    }catch(error){
      console.error(error);
    }
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
        <Paper elevation={3} style={{height: "100%"}}>
          <Box p={2} className="ticket-box">
          <h2>{Number(event.price) === 0 ? "Free" : `$${price}`}</h2>
            {attending ? (<button className="attending-btn" onClick={unattendEvent}>Attending</button> ) :
            (<button className="ticket-btn" onClick={attendEvent}>Attend</button>)
            }
            { userEvent ? (
            <Box display="flex" justifyContent="space-between" mt={2} gap={1}>
            {!showModal && (
                <Box display="flex" gap={2}>
                  <button className="edit-btn">
                    Edit
                  </button>
                  <button className="delete-btn" onClick={showDeleteConfirmation}>
                    Delete
                  </button>
                </Box>
              )}
              {showModal && (
                <div className="modal-overlay">
                    <p>Are you sure you want to delete this event?</p>
                    <Box display="flex" gap={2} alignItems={"center"} justifyContent="center">
                    <button onClick={() => confirmDeleteEvent(event.id)} className="confirm-btn">Yes, Delete</button>
                    <button onClick={() => setShowModal(false)} className="delete-btn">Cancel</button>
                    </Box>
                </div>
              )}
            </Box>
            ) : <div></div>}
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default GetTickets;
