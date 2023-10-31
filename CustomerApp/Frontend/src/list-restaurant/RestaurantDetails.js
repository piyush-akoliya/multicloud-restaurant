import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DetailsCard from './DetailsCard';
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

// Defines a component for displaying restaurant details
const RestaurantDetails = () => {
  const { id } = useParams(); // Retrieves the restaurant ID from the URL parameters
  const navigate = useNavigate(); // Hook to navigate to different routes
  const [restaurant, setRestaurant] = useState(null); // State to hold restaurant details
  const [isReserveDialogOpen, setReserveDialogOpen] = useState(false); // State for reservation dialog visibility

  // Fetches restaurant data when the component mounts or when the id changes
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        // Make a GET request to the API to fetch restaurant details
        const response = await axios.get('https://b3irstkdylemeqtu2ep24jvtd40jsnnr.lambda-url.us-east-1.on.aws/');
        // Parse and clean the data received from the API
        const data = response.data;
        // Find the specific restaurant using the ID from URL parameters
        const selectedRestaurant = data.find((item) => item.restaurant_id === id);
        setRestaurant(selectedRestaurant);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchRestaurantData();
  }, [id]); // Only re-run the effect if the `id` changes

  // Opens the reservation dialog
  const handleOpenReserveDialog = () => {
    setReserveDialogOpen(true);
  };

  // Closes the reservation dialog
  const handleCloseReserveDialog = () => {
    setReserveDialogOpen(false);
  };

   // Handles the reservation confirmation action
  const handleConfirmReservation = () => {
    // Close the dialog
    setReserveDialogOpen(false);
    // Navigate to the check availability page
    navigate('/checkAvailability');
  };

  // Show a loading state if the restaurant data is not yet loaded
  if (!restaurant) {
    return <div>Loading...</div>;
  }

  // Render the restaurant details along with operation hours and reservation button
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {restaurant.restaurant_name} Details
      </Typography>
      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            <b>Location:</b> {restaurant.restaurant_location}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <b>Operation Hours:</b>{' '}
            {restaurant.restaurant_operation_details.map((time, index) => (
              <span key={index}>
                {time.day} - {time.opening_time} to {time.closing_time}
                <br />
              </span>
            ))}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <b>Number of Tables:</b> {restaurant.restaurant_number_of_tables}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleOpenReserveDialog} sx={{ mt: 2 }}>
            Reserve Table
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isReserveDialogOpen} onClose={handleCloseReserveDialog}>
        <DialogTitle>Reserve a Table</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reserve a table at {restaurant.restaurant_name}, please confirm your booking details.
          </DialogContentText>
          {/* Reservation form or detail confirmation can be added here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReserveDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmReservation} color="primary" autoFocus>
            Confirm Reservation
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={3}>
        {restaurant?.restaurant_food_menu?.map((data, i) => (
          <Grid item sm={4} key={i}>
            <Paper elevation={3} sx={{ padding: 2, height: '100%' }}>
              <DetailsCard data={data} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RestaurantDetails;
