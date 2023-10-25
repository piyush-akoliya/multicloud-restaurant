import React from 'react';

const RestaurantCard = ({ id, name, location, operationHours, numOfTables, foodMenu }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="restaurant-name">{name}</div>
        <div className="location">Location: {location}</div>
        <div className="operation-hours">Operation Hours: {operationHours}</div>
        <div className="tables">Number of Tables: {numOfTables}</div>
        <div className="food-menu">Food Menu: {foodMenu}</div>
      </div>
    </div>
  );
};

export default RestaurantCard;
