import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, CardActions, Container } from "@mui/material";
import "./MediaCard.css";
import CardActionArea from "@mui/material/CardActionArea";
import Decimal from "decimal.js";
import { AccountBox, Person } from "@mui/icons-material";

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

interface MediaCardProps {
  event: Event;
}

const MediaCard: React.FC<MediaCardProps> = ({ event }) => {
  const currentDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const startTimeString =
    event && event.startTime ? `${currentDate}T${event.startTime}` : 0;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          image={event.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {event.title}
          </Typography>
          <Typography fontSize="15px" sx={{ color: "text.secondary" }}>
            {new Date(event.startDate).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}{" "}
            |{" "}
            {new Date(startTimeString).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true, // This will display time in 24-hour format
            })}
          </Typography>
          <Typography fontSize="15px">{event.venue.name}</Typography>
          <Typography fontSize="15px" fontWeight="bold">
            From ${Number(event.price).toFixed(2)}
          </Typography>
          <Box className="creator-info">
            <Person sx={{ mr: 1, fontSize: "15px" }} />{" "}
            <Typography>
              {event.creator.firstName} {event.creator.lastName}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MediaCard;
