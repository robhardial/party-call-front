import axios from "axios";
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

interface EventDto{
  event : Event;
  fileDto: {
    fileName : string;
    base64 : string;
  }
}

const getEvents = async (): Promise<Event[]> => {
  try {
    const response = await axios.get("http://localhost:8080/events");
    console.log("Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

const getEventsByUserId = async (userId: number): Promise<Event[]> => {
  try {
    const response = await axios.get(
      `http://localhost:8080/events/user/${userId}`,
    );
    console.log("Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

const getEventByTitle = async (title: string): Promise<Event> => {
  try {
    const response = await axios.get(
      `http://localhost:8080/events/title/${title}`,
    );
    console.log("Data:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error; // Throw the error for the calling function to handle
  }
};

const createEvent = async (eventDto: EventDto) : Promise<Event> => {

    try{

      const token = localStorage.getItem('jwtToken'); 

      if (!token) {
        throw new Error('No access token found');
      }

      const response = await axios.post(
        `http://localhost:8080/events/event`,
        eventDto,
        {
          headers: {
            'Authorization': `Bearer ${token}`,  // Include the Bearer token in the header
            'Content-Type': 'application/json',   
          }
        }
      );
      console.log("Event:", response.data);
      return response.data;
    }catch(error){
      console.error(error);
      throw error;
    }
}

export { getEvents, getEventsByUserId, getEventByTitle, createEvent };
