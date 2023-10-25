import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop';
import './components/styles.css';

import RestaurantList from './RestaurantList';
import RestaurantDetails from './RestaurantDetails';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
      <Route path="/" component={RestaurantList} />
      <Route path="/restaurant/:id" component={RestaurantDetails} />
      </Routes>
      
    </Router>
  );
}

export default App;
