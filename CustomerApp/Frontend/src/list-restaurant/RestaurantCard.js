// RestaurantCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ id, name, location, operationHours, numOfTables, foodMenu, imageUrl }) => {
  return (
    <Link to={`/restaurant/${id}`} className="restaurant-card">
      {imageUrl && <img src={imageUrl} alt={name} className="restaurant-image"  style={{height:"200px", width:"100%", borderRadius:"5px"}}/>}
      <h2>{name}</h2>
      {/* <p>id: {id}</p> */}
      <p><b>Location:</b> {location}</p>
      <p><b>Operation Hours:{" "}</b>
        {operationHours.map((time, index) => (
          <span key={index}>
            {time.day} - {time.opening_time.toString().substring(0,2)}:{time.opening_time.toString().substring(2,4)} to {time.closing_time.toString().substring(0,2)}:{time.closing_time.toString().substring(2,4)}
            <br />
          </span>
        ))}
      </p>
      {/* <p>Number of Tables: {numOfTables}</p> */}
      {/* <p>Food Menu: {JSON.stringify(foodMenu)}</p> */}
      <div className="view-details">View Details</div>
    </Link>
  );
};

export default RestaurantCard;
