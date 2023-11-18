import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import ViewReservation from "./views/Reservation/viewReservation";

import Login from "./auth/login";
import Signup from "./auth/signup";
import MyCalendarComponent from "./views/Demo/HolisticView/dayGrid";

import NavbarLayout from "./utils/NavbarLayout";
const Router = () => {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/grid" element={<MyCalendarComponent />} />
        <Route path="/" element={<NavbarLayout />}>
          <Route path="/viewReservation" element={<ViewReservation />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
