import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Demo from "./views/Demo";
import NavbarLayout from "./utils/NavbarLayout";
import Menu from "./views/Menu";

const Router = () => {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<NavbarLayout />}>
          <Route path="/" element={<Demo />} />
          <Route path="/menu" element={<Menu />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
