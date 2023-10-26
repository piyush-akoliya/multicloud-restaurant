import React from 'react';
import RestaurantCard from './RestaurantCard';
import restaurantsData from './restaurantData';
import './styles.css';

const RestaurantList = () => {   return (     <div className="restaurant-list">      {restaurantsData.map((restaurant) => (        <RestaurantCard          key={restaurant.id}          id={restaurant.id}          name={restaurant.name}          location={restaurant.location}          operationHours={restaurant.operationHours}          numOfTables={restaurant.numOfTables}          foodMenu={restaurant.foodMenu}        /> ))} </div>  ); };


export default RestaurantList;
