import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

const Router = () => {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<NavbarLayout />}></Route>
      </Routes>
    </>
  );
};

export default Router;
