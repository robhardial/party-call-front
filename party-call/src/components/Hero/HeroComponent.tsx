import React from 'react';
import PartyImg from "../../assets/party.jpeg"
import { Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
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