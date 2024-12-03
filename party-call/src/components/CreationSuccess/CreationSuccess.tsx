import React from "react";
import './CreationSuccess.css'
import party from '../../assets/party.png'
import { Button } from "@mui/material";
import { Link } from "react-router-dom";


const CreationSuccess: React.FC = () => {

    return(
        <div className="container">
            <div className="top-section"></div>
            <div className="bottom-section"></div>
            <div className="center-box">
                <img src={party} className="party-img"></img>
                <h2 style={{fontFamily: "sans-serif"}}>Event Created Successfully!</h2>
                <p style={{fontFamily:"sans-serif", color:"#949494", lineHeight:"1.5"}}>Congratulations! Your event has been successfully created. Please view My Events to view created events.</p>
                <div className="home-button">
                <Link to="/" >
                    <Button variant="outlined" size="large" >Return to home</Button> 
                </Link> 
                </div>
            </div>
        </div>
    )
}

export default CreationSuccess;