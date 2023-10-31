// Importing necessary modules from React and axios, as well as the RestaurantCard component and the CSS file
import React, { useState, useEffect } from "react";
import axios from "axios";
import RestaurantCard from "./RestaurantCard"; // Importing the RestaurantCard component
import "./styles.css"; // Importing the CSS file for styling

// RestaurantList component that fetches and displays a list of restaurants
const RestaurantList = () => {
  // Initializing the state for restaurants data
  const [restaurantsData, setRestaurantsData] = useState([]);

  // Using the useEffect hook to fetch the list of restaurants
  useEffect(() => {
    // Fetching data from the provided API endpoint
    axios
      .get(
        // "https://471h7c20q8.execute-api.us-east-1.amazonaws.com/Test-1/list-of-restaurants"
        "https://ks1pq2xfal.execute-api.us-east-1.amazonaws.com/dev/listOfRestaurants"
      )
      .then((response) => {
        console.log(response.data);
        setRestaurantsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error); // Logging an error if the data fetching fails
      });
  }, []);

  // Rendering the list of restaurants
  return (
    <div className="list-container">
      <h1>List of Restaurants</h1> {/* Displaying the title */}
      <div className="restaurants">
        {/* Mapping through the restaurantsData and rendering each restaurant as a RestaurantCard component */}
        {restaurantsData ? (
          restaurantsData.map((restaurant, index) => (
            <RestaurantCard
              key={index} // Using the index as the key
              id={restaurant.restaurant_id} // Passing the restaurant id
              name={restaurant.restaurant_name} // Passing the restaurant name
              location={restaurant.restaurant_location} // Passing the restaurant location
              operationHours={restaurant.restaurant_operation_details} // Passing the restaurant operation hours
              numOfTables={restaurant.restaurant_number_of_tables} // Passing the number of tables
              foodMenu={restaurant.restaurant_food_menu} // Passing the restaurant food menu
              imageUrl={restaurant.img_url} // Passing the restaurant image URL
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

// Exporting the RestaurantList component
export default RestaurantList;
