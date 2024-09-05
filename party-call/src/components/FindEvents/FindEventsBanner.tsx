import React from "react";
import FindBanner from '../../assets/FindEventsBannernew.jpg'
import './FindEventsBanner.css'

const FindEventsBanner: React.FC = () => {
    return(
        <div>
            <img src={FindBanner} alt="Find Events Banner" className="hero-image" />
            <br></br>
        </div>
    )
}

export default FindEventsBanner;