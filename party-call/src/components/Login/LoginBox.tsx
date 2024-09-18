import React, { useState } from "react";
import { Person, Email, Password, ArrowForwardIos  } from "@mui/icons-material";
import user_icon from '../../assets/user.png'
import lock from '../../assets/lock.png'
import email_icon from '../../assets/envelope.png'
import Alert from '@mui/material/Alert';
import './LoginBox.css'
import axios from "axios";
import { Navigate } from "react-router-dom";




const LoginBox: React.FC = () => {

    const [action, setAction] = useState("Sign Up");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        setMessage(""); 

        try {
            let response;

            if (action === "Sign Up") {
                const [firstName, lastName] = name.split(" ");
                response = await axios.post("http://localhost:8080/auth/register", {
                    firstName,
                    lastName,
                    email,
                    password
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    setMessage("Registration successful!");
                } else {
                    setMessage("Registration failed. Please try again.");
                }
            } else {
                response = await axios.post("http://localhost:8080/auth/authenticate", {
                    email,
                    password
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    setMessage("Login successful!");
                    localStorage.setItem('jwtToken', response.data.token);
                } else {
                    setMessage("Login failed. Please try again.");
                }

                console.log(response.data)
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


    
    return(
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action ==="Login"?<div></div>:
                <div className="input">
                    <img src={user_icon} alt=""/>
                    <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}></input>
                </div>}

                <div className="input">
                    <img src={email_icon} alt=""/>
                    <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="input">
                    <img src={lock} alt=""/>
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                </div>
                {action ==="Sign Up"?<div></div>:
                <div className="forgot-password">Forgot Password? <span>Click Here</span></div>
}
                <div className="submit-container">
                    <div className={action==="Login"?"submit gray":"submit"} onClick={() => {
                                if (action === "Sign Up") {
                                    handleSubmit();  // Submit when action is "Sign Up"
                                } else {
                                    setAction("Sign Up");  // Change action to "Sign Up"
                                }
                            }}
                        >  Sign Up</div>


                    
                    <div className={action==="Sign Up"?"submit gray":"submit"} onClick={() => {
                                if (action === "Login") {
                                    handleSubmit();  // Submit when action is "Sign Up"
                                } else {
                                    setAction("Login");  // Change action to "Sign Up"
                                }
                            }}
                        > Login</div>
                </div>
                {message == "Registration failed. Please try again." && <Alert severity="error" className="message">{message}</Alert>}
                {message == "Registration successful!" && <Alert severity="success" className="message">{message}</Alert>}

                {message == "Login failed. Please try again." && <Alert severity="error" className="message">{message}</Alert>}
                {message == "Login successful!" && <Alert severity="success" className="message">{message}</Alert>}
    
            </div>
    )
}

export default LoginBox;