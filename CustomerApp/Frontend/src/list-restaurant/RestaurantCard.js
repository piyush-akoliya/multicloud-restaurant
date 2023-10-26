import React from 'react';
import { Link } from 'react-router-dom';
 
const RestaurantCard = ({ id, name, location, operationHours, numOfTables, foodMenu }) => {
  return (
<div className="restaurant-card">
<h2>{name}</h2>
<p>id: {id}</p>
<p>Location: {location}</p>
<p>Operation Hours: {operationHours}</p>
<p>Number of Tables: {numOfTables}</p>
<p>Food Menu: {foodMenu}</p>
<Link to={`/restaurant/${id}`}>View Details</Link>
</div>
  );
};
 
export default RestaurantCard;