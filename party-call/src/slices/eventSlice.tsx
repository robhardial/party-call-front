import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Decimal from "decimal.js";

interface Event {
    eventId: number;
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
    imageUrl: string; 
    description: string;
    creator: {
      userId: number;
      firstName: string;
      lastName: string;
    };
}

interface Ticket{
    price: Decimal,
    eventId: number,
    userId: string
}

interface EventState{
    events : Event[],
    tickets : Ticket[],
}

const initialState: EventState = {
    events : [],
    tickets : [],
}

const eventSlice = createSlice({
    name : 'events',
    initialState,
    reducers : {
        setEvents : (state, action: PayloadAction<Event[]>) =>{
            state.events = action.payload;
        },
        setTickets : (state, action: PayloadAction<Ticket[]>) => {
            state.tickets = action.payload;
        },
        clearData : (state) => {
            state.events = [];
            state.tickets = [];
        }
    }
})

export const { setEvents, setTickets, clearData } = eventSlice.actions;
export default eventSlice.reducer;