import React from 'react';
import newParty from '../../assets/newParty.png';
import { Paper, Button } from '@mui/material';
import './HeroComponent.css'
import { Link } from 'react-router-dom';




const HeroComponent: React.FC = () => {

    

    return(
        <section className="custom-hero">
                <div className="hero-container">
                <img src={newParty}  alt="Party Banner" className="hero-image" />
                <div className="hero-text">
                    <h1>Let's Make A Party Call</h1>
                    <Link to={'find-events'} className='link-reset'>
                    <Button size="large" variant="contained" color='inherit'>Find Events</Button>
                    </Link>
                </div>
                </div>
        </section>
    )
}

export default HeroComponent;