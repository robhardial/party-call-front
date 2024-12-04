import React from "react";
import CreateEvent from "../../components/CreateEvent/CreateEvent";
import CreateEventSignup from "../../components/CreateEvent/CreateEventSignup";

const CreateEventPage: React.FC = () => {
  const token = localStorage.getItem("jwtToken"); // check for jwt

  return token ? <CreateEvent /> : <CreateEventSignup />; //conditional render
};

export default CreateEventPage;
