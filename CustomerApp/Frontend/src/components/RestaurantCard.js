import React from 'react';

const RestaurantCard = ({ id, name, location, operationHours, numOfTables, foodMenu }) => {
  return (
    <div className="card">
      <div>ID: {id}</div>
      <div>Name: {name}</div>
      <div>Location: {location}</div>
      <div>Operation Hours: {operationHours}</div>
      <div>Number of Tables: {numOfTables}</div>
      <div>Food Menu: {foodMenu}</div>
    </div>
  );
};

export default RestaurantCard;
