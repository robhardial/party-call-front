import { Box, Button, Typography } from "@mui/material";
import React from "react";
import './CreateEventSignup.css'
import partysignup from '../../assets/create-event-signup.png'
import { Navigate, useNavigate } from "react-router-dom";

const CreateEventSingup : React.FC = () => {

    const navigate = useNavigate();

    return(
        <Box className="split-page">

            <Box className="top-half"/>          
            <Box className="middle-half"/>
            <Box className="bottom-half"/>
            <div className="btn-container-signup">
                <div className="sign-up" onClick={() =>{navigate("/login")}}>Sign Up</div>
                <div className="learn-more">Learn More</div>
            </div>
            <img src={partysignup} className="party-image"/>
            <Typography className="main-text" fontWeight={"bolder"}>Let's Make A Party Call</Typography>
            <Typography className="sec-main-text" fontWeight={"bolder"} fontSize={"1.3rem"}>The all-in-one ticketing and discovery platform trusted by millions of organizers and attendees worldwide</Typography>
            <div className="box-signup">
                <div className="first-text">
                    <span>HELPING</span>
                    <span>YOU GROW</span>
                </div>
                <div className="second-text">
                    <span>It's free to publish unlimited events and sell</span>
                    <span>unlimited tickets</span>
                </div>
                <div className="big-sign-up" onClick={() => {navigate("/login")}}>
                    Create Next Event
                </div>
            </div>
            

        </Box>
    )
}

export default CreateEventSingup;