import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import "./LoginBox.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { userLogin, userRegistration } from "../../services/Auth.api";
import { setEvents, setTickets } from "../../slices/eventSlice"; //implement this!!
import { getEventsByEmail, getTicketsByUser } from "../../services/Events.api";

const LoginBox: React.FC = () => {
  const [action, setAction] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async () => {
    const newErrors = {
      name: action === "Sign Up" && !name ? "Name is required." : "",
      email: !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        ? "Invalid email address."
        : "",
      password: password.length < 6 ? "At least 6 characters." : "",
    };
  
    setErrors(newErrors);
  

    if (Object.values(newErrors).some((error) => error)) {
      return; 
    }

    try {
      let response;

      if (action === "Sign Up") {
        const [firstName, lastName] = name.split(" ");
        response = await userRegistration(firstName,lastName,email,password);

        if (response) {
          setMessage("Registration successful!");
          localStorage.setItem("jwtToken", response.token);
          window.location.href = "/";
        } else {
          setMessage("Registration failed. Please try again.");
        }
      } else {
        response = await userLogin(email, password);

        if (response) {
          setMessage("Login successful!");
          localStorage.setItem("jwtToken", response.token);
        } else {
          setMessage("Login failed. Please try again.");
        }

        const events = await getEventsByEmail(email);
        const tickets = await getTicketsByUser(email);


        dispatch(setEvents(events));
        dispatch(setTickets(tickets));

        window.location.href = "/";

        console.log(response);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (action === "Sign Up") {
          setMessage("Registration failed. Please try again.");
        } else {
          setMessage("Login failed. Please try again.");
        }
        console.error(error.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            ></input>
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
        )}

        <div className="input">
          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="input">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
      </div>
      {action === "Sign Up" ? (
        <div></div>
      ) : (
        <div className="forgot-password">
          Forgot Password? <span>Click Here</span>
        </div>
      )}
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            if (action === "Sign Up") {
              handleSubmit(); // Submit when action is "Sign Up"
            } else {
              setAction("Sign Up"); // Change action to "Sign Up"
            }
          }}
        >
          {" "}
          Sign Up
        </div>

        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            if (action === "Login") {
              handleSubmit(); // Submit when action is "Sign Up"
            } else {
              setAction("Login"); // Change action to "Sign Up"
            }
          }}
        >
          {" "}
          Login
        </div>
      </div>
      {message == "Registration failed. Please try again." && (
        <Alert severity="error" className="message">
          {message}
        </Alert>
      )}
      {message == "Registration successful!" && (
        <Alert severity="success" className="message">
          {message}
        </Alert>
      )}

      {message == "Login failed. Please try again." && (
        <Alert severity="error" className="message">
          {message}
        </Alert>
      )}
      {message == "Login successful!" && (
        <Alert severity="success" className="message">
          {message}
        </Alert>
      )}
    </div>
  );
};

export default LoginBox;
