import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DetailsCard from './DetailsCard';
import { Grid } from '@mui/material';

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

  console.log(restaurant?.restaurant_food_menu)

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="restaurant-details">
      <h2>{restaurant.restaurant_name} Details</h2>
      <p>id: {restaurant.restaurant_id}</p>
      <p>Location: {restaurant.restaurant_location}</p>
      <p>Operation Hours: 
        {restaurant.restaurant_operation_details.map((time, index) => (
          <span key={index}>
            {time.day} - {time.opening_time} to {time.closing_time}
            <br />
          </span>
        ))}
      </p>
      <p>Number of Tables: {restaurant.restaurant_number_of_tables}</p>
      
     <Grid container spacing={3} alignItems="center" justifyContent="center">
      {restaurant?.restaurant_food_menu?.map((data,i)=>(
        <Grid item sm={3} key={i}><DetailsCard data={data} /></Grid>
      ))}
     
     </Grid>

          
        
      
    </div>
  );
};

export default RestaurantDetails;
