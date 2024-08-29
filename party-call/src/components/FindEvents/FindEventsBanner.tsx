import React from "react";
import FindBanner from '../../assets/FindEventsBannernew.jpg'
import './FindEventsBanner.css'
import EventsList from "../EventsList/EventsList";

const FindEventsBanner: React.FC = () => {
    return(
        <div>
            <img src={FindBanner} alt="Find Events Banner" className="hero-image" />
            <br></br>
            <h1 className="events-title" >Explore Events</h1>
            <EventsList />
        </div>
    )
}

export default FindEventsBanner;