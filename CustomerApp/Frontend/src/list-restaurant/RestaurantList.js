// RestaurantList.js
import React from 'react';
import RestaurantCard from './RestaurantCard';
import restaurantsData from './restaurantData';
import './styles.css';

const RestaurantList = () => {
  return (
    <div className="list-container">
      <h1>List of Restaurants</h1>
      <div className="restaurants">
        {restaurantsData.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            id={restaurant.id}
            name={restaurant.name}
            location={restaurant.location}
            operationHours={restaurant.operationHours}
            numOfTables={restaurant.numOfTables}
            foodMenu={restaurant.foodMenu}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
