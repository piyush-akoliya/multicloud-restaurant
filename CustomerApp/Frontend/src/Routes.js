import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import DemoPage1 from './views/DemoPage1';
import DemoPage2 from './views/DemoPage2';
import NavbarLayout from './utils/NavbarLayout';
import RestaurantDetails from './list-restaurant/RestaurantDetails';
import RestaurantList from './list-restaurant/RestaurantList';
import './list-restaurant/styles.css';
import Footer from './utils/Footer';

const Router = () => {
  const location = useLocation();

  return (
    <>
    <NavbarLayout /> 
    <Routes location={location} key={location.pathname}>
      <Route path="/DemoPage1" element={<DemoPage1 />} />
      <Route path="/DemoPage2" element={<DemoPage2 />} />
      <Route path="/restaurantList" element={<RestaurantList />} />
      <Route path="/restaurant/:id" element={<RestaurantDetails />} />
    </Routes>
    <Footer />
    </>
  );
};

export default Router;
