import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
function MenuReservationApp() {
  const userId = (localStorage.getItem('user_id'));
  const [menuItems, setMenuItems] = useState([]);

  const location = useLocation();
  const reservationData = location.state?.reservationData || {};

  useEffect(() => {
    // Axios call on page load
    axios
      .post('https://3ithnk2mg5.execute-api.us-east-1.amazonaws.com/dev/get-menu', {
        restaurant_id: reservationData["restaurant_id"],
      })
      .then((response) => {
        // Assuming the response data is an array of menu items
        setMenuItems(response.data.body.restaurant_food_menu);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching menu items:', error);
      });
  },[] ); // The empty dependency array ensures that this effect runs only once on mount

  const isEntireMenuOffer = menuItems.length > 0 && menuItems[0].menu_offer !== undefined;

  const getNonSlashedPrice = (item) => {
    return {
      regularPrice: item.menu_price,
      discountedPrice: Math.round((item.menu_price / 1.1) * 100) / 100, // Display regular price divided by 10%
    };
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    // Ensure newQuantity is a valid number and greater than or equal to 0
    newQuantity = Number.isNaN(newQuantity) || newQuantity < 0 ? 0 : newQuantity;
  
    setMenuItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
  
      return updatedItems;
    });
  };
  
  

  const handleAddToCart = async () => {
    const selectedItems = menuItems.filter((item) => item.quantity > 0);
    console.log('Selected items:', selectedItems);
    // Implement your logic to submit the reservation here

console.log(reservationData["reservation_id"] )
    // Step 2: Prepare the updated data
    const updatedData = {
      id:reservationData["reservation_id"] , // The reservation ID to update
      food_reservation:selectedItems,
       // This is hardcoded for now, adjust as needed
      updated_by: userId,
      updated_date: new Date().toISOString()
  };

  // Step 3: Send the updated data to the cloud function
  try {
    console.log(JSON.stringify(updatedData))
      const response = await fetch('https://us-central1-serverless-402614.cloudfunctions.net/updateReservation', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData)
      });
      const result = await response.json();
      if (response.ok) {
          alert('Reservation updated successfully!');
         
      } else {
          alert('Failed to update reservation: ' + (result.error || 'Unknown error'));
      }
  } catch (error) {
      alert('Error updating reservation: ' + error.message);
  }

    // Reset quantities after submitting
    setMenuItems((prevItems) =>
      prevItems.map((item) => ({ ...item, quantity: 0 }))
    );
  };

  // Group menu items by category
  const categories = [...new Set(menuItems.map((item) => item.category))];

  return (
    <Container className="mt-5">
      <h1 className="text-center">Restaurant Menu</h1>
      {isEntireMenuOffer && (
        <div className="text-center">
          <h3>Special Offer: 20% off on the entire menu!</h3>
        </div>
      )}
      {categories.map((category) => (
        <div key={category}>
          <h2 className="text-center">{category}</h2>
          <Grid container spacing={3}>
            {menuItems
              .filter((item) => item.category === category)
              .map((item) => (
                <Grid key={item.id} item xs={12} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt={item.menu_category}
                      height="140"
                      image={item.menu_image}
                    />
                    <CardContent>
                      <h5>{item.menu_category}</h5>
                      {isEntireMenuOffer && (
                        <>
                          <p style={{ textDecoration: 'line-through', color: 'gray' }}>
                            ${getNonSlashedPrice(item).regularPrice}
                          </p>
                          <p style={{ fontWeight: 'bold', color: 'red' }}>
                            ${getNonSlashedPrice(item).discountedPrice}
                          </p>
                        </>
                      )}
                      {!isEntireMenuOffer && <p>${item.menu_price}</p>}
                      <p>Ingredients: {item.menu_ingrediants}</p>
                      <p>Discount: {item.menu_offer}</p>
                      <p>
                        Availability:{' '}
                        {item.menu_item_availability === 'available' ? 'Available' : 'Unavailable'}
                      </p>
                      {item.menu_item_availability === 'available' && (
                        <div className="text-center">
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </div>
      ))}
      <div className="text-center mt-4">
        <Button variant="contained" color="primary" size="large" onClick={handleAddToCart}>
          Submit Reservation
        </Button>
      </div>
    </Container>
  );
}

export default MenuReservationApp;

