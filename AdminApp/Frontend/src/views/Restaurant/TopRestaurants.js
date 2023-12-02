import React from "react";
import "./styles.css";

/**
 * Functional component to display the top restaurants.
 * This component renders an iframe embedding a report from Google Looker Studio.
 * The report is expected to showcase information about top restaurants.
 */
function TopRestaurants() {
  return (
    <div className="App">
      <header className="App-header">
        {/* iframe to embed the Google Looker Studio report */}
        <iframe 
          width="600" 
          height="450" 
          src="https://lookerstudio.google.com/embed/reporting/5fa8f379-3b69-45e8-8802-38212db48f98/page/aV2jD" 
          frameBorder="0" 
          style={{ border: 0 }} 
          allowFullScreen 
        >
        </iframe>
      </header>
    </div>
  );
}

export default TopRestaurants;