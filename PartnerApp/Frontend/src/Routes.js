import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ViewReservation from "./views/Reservation/viewReservation";

import Slots from "./views/Reservation/checkAvailability";

import NavbarLayout from "./utils/NavbarLayout";
const Router = () => {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<NavbarLayout />}>
          <Route path="/checkAvailability" element={<Slots />} />
          <Route path="/viewReservation" element={<ViewReservation />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
