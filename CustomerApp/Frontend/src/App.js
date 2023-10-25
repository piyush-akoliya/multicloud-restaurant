import React from 'react';
import Router from "./Routes";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import './components/styles.css';

import RestaurantList from './RestaurantList';

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Router />
          <div className="App">
            <h1>Restaurant List</h1>
          <RestaurantList />
          </div>
          <Router />
        </ScrollToTop>
      </BrowserRouter>

    </>
  );
}

export default App;
