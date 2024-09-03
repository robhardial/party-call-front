import axios from 'axios'

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

export {getEvents};