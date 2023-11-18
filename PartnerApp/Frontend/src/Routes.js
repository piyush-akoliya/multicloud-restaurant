import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Demo from "./views/Demo";
import NavbarLayout from "./utils/NavbarLayout";
import RestaurantAvailabilityForm from "./views/Demo/Restaurant Details/RestaurantAvailabilityForm";
import TableDetails from "./views/Demo/Restaurant Details/TableDetails";
import ReservationCancellation from "./views/Demo/Restaurant Details/ReservationCancellation";
import AddMenuItemForm from "./views/Demo/Restaurant Details/AddMenuItemForm";
import Menu from "./views/Menu";

const Router = () => {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<NavbarLayout />}>
          <Route path="/menu" element={<Menu />} />
          <Route path="/AddMenuItemForm" element={<AddMenuItemForm />} />
          <Route
            path="/ReservationCancellation"
            element={<ReservationCancellation />}
          />
          <Route
            path="/RestaurantAvailabilityForm"
            element={<RestaurantAvailabilityForm />}
          />
          <Route path="/TableDetails" element={<TableDetails />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
