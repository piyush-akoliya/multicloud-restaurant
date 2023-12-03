import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NavbarLayout from "./utils/NavbarLayout";
import Home from "./views/Home";
import Login from "./views/Login/Login";
import Reviews from "./views/Reviews";
import Customers from "./views/Customers";
const Router = () => {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<NavbarLayout />}>
          <Route path="/ReviewsDashboard" element={<Reviews />} />
          <Route path="/CustomersDashboard" element={<Customers />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
