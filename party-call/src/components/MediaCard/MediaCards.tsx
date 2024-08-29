import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import './MediaCard.css'
import CardActionArea from '@mui/material/CardActionArea';


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
    startTime: string; // Assuming you're sending this as an ISO time string
    image: string
  }
  
  interface MediaCardProps {
    event: Event;
  }
  

const MediaCard: React.FC<MediaCardProps> = ({ event }) =>{
  return (
    <Card sx={{ maxWidth: 345 }} className='card-container'>
      <CardActionArea className='action-area'>
      <CardMedia
        className='card-image'
        sx={{ height: 140 }}
        image={event.image}
        title={event.title}
      />
      <CardContent className='card-content'>
        <Typography gutterBottom variant="h5" component="div">
          {event.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 'bold', fontSize: '14px' }}>
          {event.startDate} • {event.startTime} 
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary'}}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {event.venue.name}
        </Typography>
        </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MediaCard;
