import React, { useState } from "react";
import "./RestaurantAvailabilityForm.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
const RestaurantAvailabilityForm = () => {
  // Initialize state for form inputs
  const [day, setDay] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");

  // Initialize state for the restaurant details
  const [restaurantDetails, setRestaurantDetails] = useState({
    // restaurant_id: localStorage.getItem("restaurant_id") || "1",
    restaurant_id: "2",
    restaurant_operation_details: [],
  });

  // Valid days of the week
  const validDaysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the entered day is valid
    if (!validDaysOfWeek.includes(day)) {
      alert("Please enter a valid day of the week.");
      return;
    }

    if (openingTime == "" || closingTime == "") {
      alert("Please provide the openingTime and Closing Time");
      return;
    }

    if (closingTime < openingTime) {
      alert("Opening Time cannot be greater than the closing time.");
      setOpeningTime("");
      setClosingTime("");
      return;
    }

    // Update restaurant details state with new availability
    setRestaurantDetails({
      ...restaurantDetails,
      restaurant_operation_details: [
        ...restaurantDetails.restaurant_operation_details,
        {
          day,
          opening_time: openingTime,
          closing_time: closingTime,
        },
      ],
    });

    // Clear form inputs
    setDay("");
    setOpeningTime("");
    setClosingTime("");
  };

  // Function to check if availabilities for all days are added
  const areAllDaysAdded = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const addedDays = restaurantDetails.restaurant_operation_details.map(
      (availability) => availability.day
    );

    return daysOfWeek.every((day) => addedDays.includes(day));
  };

  // Function to handle posting availabilities to the server
  const postAvailabilities = async () => {
    try {
      if (areAllDaysAdded()) {
        console.log("the object going is ::");
        console.log(restaurantDetails);
        const response = await axios.post(
          "https://ks1pq2xfal.execute-api.us-east-1.amazonaws.com/dev/addRestaurantOperations",
          restaurantDetails
        );

        if (response.status == 200) {
          alert("Availabilities posted successfully");
        } else {
          console.error("Failed to post availabilities");
        }
      } else {
        alert("Please add availabilities for all days before posting.");
      }
    } catch (error) {
      console.error("Error posting availabilities:", error);
    }
  };

  return (
    <div name="container">
      <h2>Add Availability</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Day:
          <input
            type="text"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Opening Time:
          <input
            type="number"
            value={openingTime}
            onChange={(e) => setOpeningTime(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Closing Time:
          <input
            type="number"
            value={closingTime}
            onChange={(e) => setClosingTime(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Add Availability</button>
      </form>
      {/* Display the added availability */}
      <h3>Added Availability:</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> Day of Week </TableCell>
              <TableCell align="right">Opening Timing in (24 hrs)</TableCell>
              <TableCell align="right">Closing Timing in (in 24 hrs)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurantDetails.restaurant_operation_details.map(
              (availability, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {availability.day}
                  </TableCell>
                  <TableCell align="right">
                    {availability.opening_time}
                  </TableCell>
                  <TableCell align="right">
                    {availability.closing_time}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Button to post availabilities */}
      <button onClick={postAvailabilities}>Post Availabilities</button>
    </div>
  );
};

export default RestaurantAvailabilityForm;
