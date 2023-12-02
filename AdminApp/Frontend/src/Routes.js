import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NavbarLayout from "./utils/NavbarLayout";
import Home from "./views/Home";
import TopRestaurants from "./views/Restaurant/TopRestaurants";

const Router = () => {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<NavbarLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/topRestaurant" element={<TopRestaurants />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
