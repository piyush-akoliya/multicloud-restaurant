import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';
import './styles.css';

const RestaurantList = () => {
  const [restaurantsData, setRestaurantsData] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          'https://471h7c20q8.execute-api.us-east-1.amazonaws.com/Test-1/list-of-restaurants'
        );
        const data = JSON.parse(response.data.body.replace(/"(\s+)(\w+)(?=")/g, '"$2'));
        console.log(data);
        setRestaurantsData(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="list-container">
      <h1>List of Restaurants</h1>
      <div className="restaurants">
        {restaurantsData.map((restaurant, index) => (
          <RestaurantCard
            key={index}
            id={restaurant.restaurant_id}
            name={restaurant.restaurant_name}
            location={restaurant.restaurant_location}
            operationHours={restaurant.restaurant_operation_details}
            numOfTables={restaurant.restaurant_number_of_tables}
            foodMenu={restaurant.restaurant_food_menu}
            imageUrl={restaurant.img_url}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
