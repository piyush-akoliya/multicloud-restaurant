import React from 'react';
import RestaurantCard from './RestaurantCard';

const restaurants = [
  {
    id: 1,
    name: 'Restaurant A',
    location: 'Location A',
    operationHours: '9:00 AM - 10:00 PM',
    numOfTables: 20,
    foodMenu: 'Menu A',
  },
  // Add more restaurants
];

const RestaurantList = () => {
  return (
    <div className="restaurant-list">
      {restaurants.map((restaurant) => (
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
  );
};

export default RestaurantList;
