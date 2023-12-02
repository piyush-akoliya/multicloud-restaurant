import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NavbarLayout from "./utils/NavbarLayout";
import Home from "./views/Home";
import TimePeriod from "./views/TimePeriod"
const Router = () => {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<NavbarLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/timeperiod" element={<TimePeriod />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
