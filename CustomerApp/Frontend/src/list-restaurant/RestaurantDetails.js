import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DetailsCard from './DetailsCard';
import { Grid, Typography, Box, Card, CardContent, Paper } from '@mui/material';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.get('https://471h7c20q8.execute-api.us-east-1.amazonaws.com/Test-1/list-of-restaurants');
        const data = JSON.parse(response.data.body.replace(/"(\s+)(\w+)(?=")/g, '"$2'));
        const selectedRestaurant = data.find((item) => item.restaurant_id === id);
        setRestaurant(selectedRestaurant);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchRestaurantData();
  }, [id]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

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
        </CardContent>
      </Card>
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
