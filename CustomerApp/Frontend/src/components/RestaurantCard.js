import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ id, name, location, operationHours, numOfTables, foodMenu }) => {
  return (
    <div className="card">
      <Link to={`/restaurant/${id}`} className="card-content"> {/* Add the Link to the specific restaurant details */}
        <div className="restaurant-name">{name}</div>
        <div className="location">Location: {location}</div>
        <div className="operation-hours">Operation Hours: {operationHours}</div>
        <div className="tables">Number of Tables: {numOfTables}</div>
        <div className="food-menu">Food Menu: {foodMenu}</div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
