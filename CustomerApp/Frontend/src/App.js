import React from "react";
import Router from "./Routes";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import Login from "./auth/login";
import Signup from "./auth/signup";
import First from "./auth/first";
import Chatbot from "./views/Chatbot";
import NavbarLayout from "./utils/NavbarLayout";
import RestaurantDetails from "./list-restaurant/RestaurantDetails";
import RestaurantList from "./list-restaurant/RestaurantList";
import "./list-restaurant/styles.css";
import Footer from "./utils/Footer";
import ViewReservation from "./views/Reservation/viewReservation";


import Slots from "./views/Reservation/checkAvailability";
export function isLoggedIn() {
  const token = localStorage.getItem("userData");
  return token !== null;
}

export function Auth({ children }) {
  return isLoggedIn() ? children : null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <NavbarLayout />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/first" element={<First />} />
          {/* <Route path="/*" element={<Navigate to="/first" />} /> */}
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/restaurantList" element={<RestaurantList />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          <Route path="/checkAvailability" element={<Slots />} />
      <Route path="/viewReservation" element={<ViewReservation />} />
        </Routes>
        {/* <Footer /> */}
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
