import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import ViewReservation from "./views/Reservation/viewReservation";

import Login from "./auth/login";
import Signup from "./auth/signup";
import MyCalendarComponent from "./views/Demo/HolisticView/dayGrid";

import NavbarLayout from "./utils/NavbarLayout";
import RestaurantAvailabilityForm from "./views/Demo/Restaurant Details/RestaurantAvailabilityForm";
import TableDetails from "./views/Demo/Restaurant Details/TableDetails";
import ReservationCancellation from "./views/Demo/Restaurant Details/ReservationCancellation";
import AddMenuItemForm from "./views/Demo/Restaurant Details/AddMenuItemForm";
import Menu from "./views/Menu/index";
import RestaurantView from "./views/Demo/Restaurant Details/RestaurantView";
const Router = () => {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<NavbarLayout />}>
          <Route path="/grid" element={<MyCalendarComponent />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/restaurantView" element={<RestaurantView />} />
          <Route path="/view-Reservation" element={<ViewReservation />} />
          <Route path="/Add-Menu" element={<AddMenuItemForm />} />
          <Route
            path="/Close-Restaurant"
            element={<ReservationCancellation />}
          />
          <Route
            path="/Operation-hours"
            element={<RestaurantAvailabilityForm />}
          />
          <Route path="/Table-Details" element={<TableDetails />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
