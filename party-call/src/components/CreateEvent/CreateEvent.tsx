import React, { useState } from "react";
import "./CreateEvent.css";
import { Autocomplete, Box, Button, Chip, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import sidebanner from "../../assets/sidebanner.png";
import { Padding, Person } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import Decimal from "decimal.js";
import { createEvent } from "../../services/Events.api";

interface File {
  name: string;
}

const states = [
  { name: "Alabama", code: "AL" },
  { name: "Alaska", code: "AK" },
  { name: "Arizona", code: "AZ" },
  { name: "Arkansas", code: "AR" },
  { name: "California", code: "CA" },
  { name: "Colorado", code: "CO" },
  { name: "Connecticut", code: "CT" },
  { name: "Delaware", code: "DE" },
  { name: "Florida", code: "FL" },
  { name: "Georgia", code: "GA" },
  { name: "Hawaii", code: "HI" },
  { name: "Idaho", code: "ID" },
  { name: "Illinois", code: "IL" },
  { name: "Indiana", code: "IN" },
  { name: "Iowa", code: "IA" },
  { name: "Kansas", code: "KS" },
  { name: "Kentucky", code: "KY" },
  { name: "Louisiana", code: "LA" },
  { name: "Maine", code: "ME" },
  { name: "Maryland", code: "MD" },
  { name: "Massachusetts", code: "MA" },
  { name: "Michigan", code: "MI" },
  { name: "Minnesota", code: "MN" },
  { name: "Mississippi", code: "MS" },
  { name: "Missouri", code: "MO" },
  { name: "Montana", code: "MT" },
  { name: "Nebraska", code: "NE" },
  { name: "Nevada", code: "NV" },
  { name: "New Hampshire", code: "NH" },
  { name: "New Jersey", code: "NJ" },
  { name: "New Mexico", code: "NM" },
  { name: "New York", code: "NY" },
  { name: "North Carolina", code: "NC" },
  { name: "North Dakota", code: "ND" },
  { name: "Ohio", code: "OH" },
  { name: "Oklahoma", code: "OK" },
  { name: "Oregon", code: "OR" },
  { name: "Pennsylvania", code: "PA" },
  { name: "Rhode Island", code: "RI" },
  { name: "South Carolina", code: "SC" },
  { name: "South Dakota", code: "SD" },
  { name: "Tennessee", code: "TN" },
  { name: "Texas", code: "TX" },
  { name: "Utah", code: "UT" },
  { name: "Vermont", code: "VT" },
  { name: "Virginia", code: "VA" },
  { name: "Washington", code: "WA" },
  { name: "West Virginia", code: "WV" },
  { name: "Wisconsin", code: "WI" },
  { name: "Wyoming", code: "WY" }
];

interface Event {
  eventId: number,
  title: string;
  venue: {
    name: String;
    address: String;
    state: String;
    zipCode: String;
    city: String;
  };
  startDate: string;
  endDate : string;
  price: Decimal;
  startTime: string;
  endTime: string;
  imageUrl: string;
  description: string;
}

interface EventDto{
  event : Event;
  fileDTO: {
    fileName : string;
    base64 : string;
  }
}

const CreateEvent: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [eventName, setEventName] = useState('');
  const [eventSummary, setEventSummary] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [venue, setVenue] =  useState({
    name: '',
    address1: '',
    city: '',
    state: '',
    zipcode: ''
  });
  const [ticketQuantity, setTicketQuantity] = useState(0);
  const [ticketAmount, setTicketAmount] = useState(0.0);
  
  const [imageError, setImageError] = useState('');
  const [errors, setErrors] = useState({
    eventName: '',
    eventSummary: '',
    date: '',
    startTime: '',
    endTime: '',
    venueName: '',
    venueAddress: '',
    venueCity: '',
    venueState: '',
    venueZipcode: '',
    ticketQuantity: ''
  });
  


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setImageError('');
    } else {
      setImageError('Please select a valid image file.');
    }
  };

  const handleVenueChange = (field : any, value : any) => {
    setVenue(prevVenue => ({
      ...prevVenue,
      [field]: value
    }));
  };

  const handleEvent = async () => {

    const newErrors = {
      eventName: eventName ? '' : 'Event title is required.',
      eventSummary: eventSummary ? '' : 'Summary is required.',
      date: date ? '' : 'Date is required.',
      startTime: startTime ? '' : 'Start time is required.',
      endTime: endTime ? '' : 'End time is required.',
      venueName: venue.name ? '' : 'Venue name is required.',
      venueAddress: venue.address1 ? '' : 'Address is required.',
      venueCity: venue.city ? '' : 'City is required.',
      venueState: venue.state ? '' : 'State is required.',
      venueZipcode: venue.zipcode ? '' : 'Zip code is required.',
      ticketQuantity: ticketQuantity > 0 ? '' : 'Ticket quantity must be greater than 0.',
      image: image ? '' : 'Image is required.'
    };

    setErrors(newErrors);

    if (!image) {
      setImageError('Image is required.');
      return;
    }

    // If there are any errors, do not submit
    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    if (hasErrors) return;

    try {
      const priceDec = new Decimal(ticketAmount);
      const startDateStr = date ? date.toISOString().split('T')[0] : '';
      let fileBase64 = '';
      const fileName = 'my-file';
  
      // Handle image file reading asynchronously
      if (image) {
        // Use a promise to handle the asynchronous file read
        fileBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onloadend = () => {
            const result = reader.result as string;
            const cleanBase64 = result.replace(/^data:image\/\w+;base64,/, "");
            resolve(cleanBase64);
          };
          reader.onerror = (error) => {
            reject(error);  // Reject on error
          };
        });
  
        const eventDto: EventDto = {
          event: {
            eventId: 0,
            title: eventName,
            venue: {
              name: venue.name,
              address: venue.address1,
              state: venue.state,
              zipCode: venue.zipcode,
              city : venue.city

            },
            description: eventSummary,
            startDate: startDateStr,
            endDate: startDateStr,
            startTime: startTime,
            endTime: endTime,
            price: priceDec,
            imageUrl: fileBase64, // Add the image as base64
          },
          fileDTO: {
            fileName: fileName,
            base64: fileBase64,
          },
        };
  
        // Call createEvent with the eventDto object
        console.log(eventDto);
        const response = await createEvent(eventDto);
        console.log('Event created:', response);
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };
  

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      sx={{ height: "100vh", width: "100%" }}
    >

    <Box
          component="form"
          p={3}
          m={0}
          sx={{
            width: "65%", 
          height: "94%", 
          overflow: "auto", 
          }}
          noValidate
          autoComplete="off"
        >
      <Paper sx={{ padding: 7 }}>
        <Grid container direction="column"  spacing={1}>
          <Grid item paddingBottom={2}>
              <Typography variant="h4" fontFamily="sans-serif">
                Event Overview
              </Typography>
          </Grid>
          <Grid item paddingBottom={2}>
            <Typography variant="h6" fontFamily="sans-serif">
              Event title
            </Typography>
          </Grid>
          <Grid item paddingBottom={2}>
            <Typography color={"grey"} fontSize={"15px"}> Be clear and descriptive with a title that tells people what your event is about.</Typography>
          </Grid>
          <Grid item xs paddingBottom={3}>
            <TextField
              required
              id="event-name"
              label="Event Title"
              fullWidth
              value={eventName} 
              onChange={(e) => setEventName(e.target.value)}
              error={!!errors.eventName}
              helperText={errors.eventName}
              InputProps={{
                sx: {
                  height: 48,
                },
              }}
            />
          </Grid>
          <Grid item paddingBottom={2}>
            <Typography variant="h6" fontFamily="sans-serif">
              Summary
            </Typography>
          </Grid>
          <Grid item paddingBottom={2}>
            <Typography color={"grey"} fontSize={"15px"}> Capture attention with a brief description of your event. This will appear at the top of your event page for attendees to see. (Max 140 characters)</Typography>
          </Grid>
          <Grid item xs paddingBottom={3}>
            <TextField
              required
              id="event-summary"
              label="Summary"
              fullWidth
              multiline
              value={eventSummary} 
              onChange={(e) => setEventSummary(e.target.value)}
              error={!!errors.eventSummary}
              helperText={errors.eventSummary}
              InputProps={{
                sx: {
                  paddingBottom:10,
                },
              }}
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{padding: 7, marginTop: 4}}>
        <Grid container direction="column"  spacing={1}>
        <Grid item paddingBottom={2}>
              <Typography variant="h4" fontFamily="sans-serif">
                Date and location
              </Typography>
         </Grid>
         <Grid item  paddingBottom={2}>
            <Typography variant="h6" fontFamily="sans-serif">
              Date and time
            </Typography>
          </Grid>
            <Grid container direction="row">
              <Grid item xs  paddingBottom={3} marginLeft={1} paddingRight={1}>
                <TextField
                  required
                  type="date"
                  id="event-date"
                  fullWidth
                  value={date ? date.toISOString().split('T')[0] : ''} // Formats date for the input
                  onChange={(e) => setDate(new Date(e.target.value))} // Sets date as a Date object
                  error={!!errors.date}
                  helperText={errors.date}
                />
              </Grid>
              <Grid item xs paddingBottom={3} paddingRight={1}>
                <TextField
                  required
                  type="time"
                  label="start time"
                  InputLabelProps={{
                    shrink: true
                  }}
                  id="event-start-time"
                  fullWidth
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)} 
                  error={!!errors.startTime}
                  helperText={errors.startTime}
                />
              </Grid>
              <Grid item xs paddingBottom={3}>
                <TextField
                  required
                  type="time"
                  label="end time"
                  InputLabelProps={{
                    shrink: true
                  }}
                  id="event-end-time"
                  fullWidth
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  error={!!errors.endTime}
                  helperText={errors.endTime}
                />
              </Grid>
            </Grid>
        </Grid>
        <Grid item paddingBottom={2}>
            <Typography variant="h6" fontFamily="sans-serif">
              Location
            </Typography>
        </Grid>
        <Grid item xs paddingBottom={3}>
            <TextField
              required
              id="venue-name"
              label="Venue Name"
              fullWidth
              value={venue.name}
              onChange={(e) => handleVenueChange('name', e.target.value)}
              error={!!errors.venueName}
              helperText={errors.venueName}
              InputProps={{
                sx: {
                  height: 48,
                },
              }}
            />
          </Grid>
          <Grid container direction="row">
            <Grid item xs paddingBottom={3} paddingRight={2}>
              <TextField
                required
                id="address1-name"
                label="Address 1"
                fullWidth
                value={venue.address1}
                onChange={(e) => handleVenueChange('address1', e.target.value)}
                error={!!errors.venueAddress}
                helperText={errors.venueAddress}
                InputProps={{
                  sx: {
                    height: 48,
                  },
                }}
              />
            </Grid>
            <Grid item xs paddingBottom={3}>
              <TextField
                required
                id="city-name"
                label="City"
                fullWidth
                value={venue.city}
                onChange={(e) => handleVenueChange('city', e.target.value)}
                error={!!errors.venueCity}
                helperText={errors.venueCity}
                InputProps={{
                  sx: {
                    height: 48,
                  },
                }}
              />
            </Grid>
        </Grid>
        <Grid container direction="row">
            <Grid item xs paddingBottom={3} paddingRight={2}>
              <FormControl fullWidth required error={!!errors.venueState}>
                <InputLabel>State</InputLabel>
                <Select
                  id="state-select"
                  label="State"
                  defaultValue="    "
                  sx={{ height: 48 }}
                  value={venue.state}
                  onChange={(e) => handleVenueChange('state', e.target.value)}
                >
                  {states.map((state) => (
                    <MenuItem key={state.code} value={state.code}>
                      {state.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.venueState}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs paddingBottom={3} paddingRight={2} marginRight={'20%'}>
              <TextField
                required
                type="number"
                id="zipcode"
                label="Zipcode"
                fullWidth
                value={venue.zipcode}
                onChange={(e) => handleVenueChange('zipcode', e.target.value)}
                error={!!errors.venueZipcode}
                helperText={errors.venueZipcode}
                InputProps={{
                  sx: {
                    height: 48,
                  },
                }}
              />
            </Grid>
        </Grid>
      </Paper>
      <Paper sx={{padding: 7, marginTop: 4}}>
        <Grid container direction="column"  spacing={1}>
         <Grid item paddingBottom={6}>
              <Typography variant="h4" fontFamily="sans-serif">
                Tickets and banner
              </Typography>
          </Grid>
          <Grid container direction="row">
            <Grid item xs paddingBottom={3} marginLeft={1} paddingRight={2}>
              <TextField
                required
                type="number"
                id="quan-tickets"
                label="Quantity of tickets"
                fullWidth
                value={ticketQuantity}
                onChange={(e) => setTicketQuantity(Number(e.target.value))}
                error={!!errors.ticketQuantity}
                helperText={errors.ticketQuantity}
                InputProps={{
                  sx: {
                    height: 48,
                  },
                }}
              />
            </Grid>
            <Grid item xs paddingBottom={3}>
            <TextField
              required
              id="amount"
              label="Amount"
              type="number" 
              fullWidth
              value={ticketAmount}
              onChange={(e) => setTicketAmount(Number(e.target.value))}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>, // Adds "$" prefix
                inputProps: { min: 0, step: 0.01 }, // Ensures positive numbers with decimals
                sx: {
                  height: 48, 
                },
              }}
            />
            </Grid>
          </Grid>
          <Grid item xs paddingBottom={3}>
            <Typography variant="h6" fontFamily="sans-serif" paddingBottom={2}>
              Upload event image
            </Typography>
          <Button color="inherit" variant="outlined"  component="label">
              Select File
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
            {preview && (
              <Box mt={2}>
                <img src={preview} alt="Selected" style={{ maxWidth: "100%", maxHeight: "300px" }} />
              </Box>
            )}

            {imageError && (
                      <Typography color="error" variant="body2">
                        {imageError}
                      </Typography>
            )}
            {image && (
              <Typography variant="body2" style={{ marginTop: 10 }}>
                Selected file: {image.name}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>

      <div className="submit-btn" onClick={handleEvent}>
      <Button variant="outlined" size="large" color="primary">Create Event</Button>
      </div>
    </Box>

    <Box
        component="img"
        src={sidebanner} 
        alt="Side Banner"
        sx={{
          width: "35%", 
          height: "100%",
          objectFit: "cover",
          right: 0
          
        }}
      />
    </Box>
  );
};

export default CreateEvent;
