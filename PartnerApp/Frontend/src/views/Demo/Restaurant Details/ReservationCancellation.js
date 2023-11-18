import React, { useState } from "react";

const ReservationCancellation = () => {
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const apiUrl =
    "https://us-central1-serverless-402501.cloudfunctions.net/updateReservationDescription"; // Replace with your actual API endpoint

  const handleCancelReservation = () => {
    // Check if both description and date are provided
    if (description && selectedDate) {
      // Make a POST request to the API endpoint
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurantId: 2, // Static restaurantId
          description,
          date: selectedDate,
          reservation_status: "Cancelled", // Static reservation_status
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server as needed
          alert("Reservation canceled successfully:", data);
          // You can also perform additional actions here, such as updating the UI
        })
        .catch((error) => {
          alert("Error canceling reservation:", error);
        });
    } else {
      // Display an error message or take appropriate action if description or date is missing
      alert("Description and date are required for cancellation.");
    }
  };

  // Get today's date in the format YYYY-MM-DD
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight

  // Calculate the maximum allowed date (today + 5 days)
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 5);

  return (
    <div>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <label>
        Select Date:
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={today.toISOString().split("T")[0]}
          max={maxDate.toISOString().split("T")[0]}
        />
      </label>
      <br />
      <button onClick={handleCancelReservation}>Cancel Reservation</button>
    </div>
  );
};

export default ReservationCancellation;