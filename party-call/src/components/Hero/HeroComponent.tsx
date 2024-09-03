import React from 'react';
import PartyImg from "../../assets/party.jpeg"
import { Paper, Button } from '@mui/material';
import './HeroComponent.css'



const HeroComponent: React.FC = () => {

    

    return(
        <section className="custom-hero">
                <div className="hero-container">
                <img src={PartyImg} alt="Party Banner" className="hero-image" />
                <div className="hero-text">
                    <h1>Let's Make A Party Call</h1>
                    <Button size="large" variant="contained" color='inherit'>Find Events</Button>
                </div>
                </div>
        </section>
    )
}

export default HeroComponent;