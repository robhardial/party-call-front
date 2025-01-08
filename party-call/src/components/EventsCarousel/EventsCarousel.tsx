import React from "react";
import { Box, IconButton } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MediaCard from "../MediaCard/MediaCards";
import Decimal from "decimal.js";

interface Venue {
    id: number;
    name: string;
    location: string;
  }
  
  interface Event {
    id: number;
    title: string;
    venue: Venue;
    startDate: string;
    startTime: string;
    image: string;
    price: Decimal;
    creator: {
      userId: number;
      firstName: string;
      lastName: string;
    };
  }
  
  interface EventCarouselProps {
    eventList: Event[];
  }
  

// Custom Arrow Component
const CustomArrow = ({ className, onClick, direction }: { className?: string; onClick?: () => void; direction: "left" | "right" }) => (
  <IconButton
    onClick={onClick}
    className={className}
    sx={{
      position: "absolute",
      top: "50%",
      zIndex: 2,
      backgroundColor: "white",
      color: "black",
      
      "&:hover": { backgroundColor: "black" },
    }}
  >
    {direction === "left" ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
  </IconButton>
);

const EventsCarousel: React.FC<EventCarouselProps> = ({ eventList }) => {
  const settings = {
    dots: true,
    infinite: true, // Enable infinite scrolling
    speed: 500,
    slidesToShow: 4, // Number of slides visible at once
    slidesToScroll: 1, // Number of slides to scroll at a time
    nextArrow: <CustomArrow direction="right" />, // Custom right arrow
    prevArrow: <CustomArrow direction="left" />, // Custom left arrow
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ maxWidth: "1300px", width: "100%", height: "auto", margin: "10px auto", padding: 2 }}>
      <Slider {...settings}>
        {eventList.map((event) => (
          <Box
            key={event.id} // Add a unique key here
            className="card-box"
            m={1}
            sx={{
              padding: "0 20px", // Add spacing between cards
              boxSizing: "border-box", 
            }}
          >
            <MediaCard event={event} />
          </Box>
        ))}
      </Slider>
    </Box>

  );
};

export default EventsCarousel;
