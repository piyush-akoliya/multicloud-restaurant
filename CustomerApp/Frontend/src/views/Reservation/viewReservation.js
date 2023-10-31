import React, { useState, useEffect } from 'react';
import './ReservationList.css'; // Importing the CSS file

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const userId = 1;

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`https://us-central1-serverless-402614.cloudfunctions.net/viewReservation2?user_id=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const data = await response.json();
          setReservations(data.reservations);
        } else {
          console.error("Failed to fetch reservations");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchReservations();
  }, [userId]);

  const convertTimestampToString = (timestamp) => {
    console.log('Original Timestamp:', timestamp); // This will show the original timestamp you're passing

    if (timestamp && timestamp.split(':').length > 3) {
        timestamp = timestamp.replace(/:\d{2}Z$/, 'Z');
        console.log('Adjusted Timestamp:', timestamp); // This will show the timestamp after adjustment
    }

    const dateObj = new Date(timestamp);
    console.log('Date Object:', dateObj); // This will show the resultant date object

    return { 
        date: dateObj.toLocaleDateString(), 
        time: dateObj.toLocaleTimeString() 
    };
};




  return (
    <div className="reservation-list">
      <h1>Reservations</h1>
      <ul>
        {reservations.map(reservation => {
          const { date, time } = convertTimestampToString(reservation.reservation_timestamp);
          return (
            <li key={reservation.reservation_id} className="reservation-item">
              <p><strong>Status:</strong> {reservation.reservation_status}</p>
              <p><strong>Date:</strong> {date}</p>
              <p><strong>Time:</strong> {time}</p>
              <p><strong>Restaurant:</strong> {reservation.restaurant_name}</p>
              <p><strong>Description:</strong> {reservation.description}</p>
              <ul className="food-list">
                {reservation.food_reservation.map((food, index) => (
                  <li key={index}>
                    Item ID: {food.item_id}, Quantity: {food.quantity}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ReservationList;
