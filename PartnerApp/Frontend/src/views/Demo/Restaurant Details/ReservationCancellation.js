import React, { useState } from "react";
import "./ReservationCancellation.css"; // Import the CSS file
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const ReservationCancellation = () => {
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const restaurantId = localStorage.getItem("restaurant_id");
  const navigate = useNavigate();
  const apiUrl =
    "https://us-central1-serverless-project-402603.cloudfunctions.net/updateReservationDescription";

  const handleCancelReservation = () => {
    const showToast = (message, type) => {
      toast(message, {
        type,
        position: "top-right",
        autoClose: 2000,
      });
    };
    // Check if both description and date are provided
    if (description && selectedDate) {
      // Get the current time in the format HH:mm:ss
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "UTC",
      });

      // Combine the selected date with the current time
      const timestamp = `${selectedDate}T${currentTime}Z`;

      // Make a POST request to the API endpoint
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurantId: restaurantId,
          description,
          date: timestamp,
          reservation_status: "Cancelled", // Static reservation_status
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          Swal.fire("Reservation cancelled  successfully");
          navigate("/menu");
        })
        .catch((error) => {
          showToast("Failed to cancellation.", "error");
        });
    } else {
      showToast("Description and date are required for cancellation.", "error");
    }
  };

  // Get today's date in the format YYYY-MM-DD
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight

  // Calculate the maximum allowed date (today + 5 days)
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 5);

  return (
    <>
      <div className="reservation-cancellation-container">
        <h1 className="reservation-cancellation-header"> Restaurant Closure</h1>
        <label className="container input-label">
          Description:
          <input
            className="input-text"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label className="container input-label">
          Select Date:
          <input
            className="input-date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={today.toISOString().split("T")[0]}
            max={maxDate.toISOString().split("T")[0]}
          />
        </label>
        <br />
        <ToastContainer />
        <button
          className="container cancel-button"
          onClick={handleCancelReservation}
        >
          Cancel Reservation
        </button>
      </div>
    </>
  );
};

export default ReservationCancellation;
