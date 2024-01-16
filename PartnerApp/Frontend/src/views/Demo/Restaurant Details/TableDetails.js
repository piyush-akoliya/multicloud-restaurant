import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TableDetails.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const TableDetails = () => {
  const [numTables, setNumTables] = useState(0);
  const [tableSize, setTableSize] = useState(2);
  const [tableDetails, setTableDetails] = useState([]);
  const restaurantId = localStorage.getItem("restaurant_id").toString();
  const navigate = useNavigate();
  // const restaurantId = "1";
  const showToast = (message, type) => {
    toast(message, {
      type,
      position: "top-right",
      autoClose: 2000,
    });
  };

  useEffect(() => {
    // Fetch table details from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://oblbtb4rq7.execute-api.us-east-1.amazonaws.com/dev/getTotalTables?restaurantId=1"
        );

        if (response.status === 200) {
          console.log(response.data);
          setTableDetails(response.data.tableDetails || []);
        } else {
          console.error("Failed to fetch table details");
        }
      } catch (error) {
        console.error("Error fetching table details:", error);
      }
    };

    fetchData();
  }, []);

  const handleTableDetailsSubmit = () => {
    if (![2, 4, 6, 8].includes(tableSize)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Number of tables must be 2, 4, 6, or 8.",
      });
      return;
    }

    if (numTables === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No of tables cannot be zero",
      });
      return;
    }

    // Check if an entry with the same table size already exists
    if (tableDetails.some((entry) => entry.tableSize === tableSize)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Table with the same size already exists.",
      });
      alert();
      return;
    }

    // Update the table details array with a new entry
    setTableDetails((prevTableDetails) => [
      ...prevTableDetails,
      { id: Date.now(), numTables, tableSize },
    ]);

    // Reset form values
    setNumTables(0);
    setTableSize(2);
  };

  const handleDeleteEntry = (id) => {
    // Filter out the entry with the specified id
    setTableDetails((prevTableDetails) =>
      prevTableDetails.filter((entry) => entry.id !== id)
    );
  };

  const handlePostData = async () => {
    // Prepare the data object
    const postData = {
      restaurant_id: restaurantId,
      table_details: tableDetails.reduce((acc, entry) => {
        acc[entry.tableSize] = parseInt(entry.numTables, 10);
        return acc;
      }, {}),
    };

    console.log(postData);
    // Post the data to a specified URL
    const response = await axios.post(
      "https://oblbtb4rq7.execute-api.us-east-1.amazonaws.com/dev/addtables",
      postData
    );

    if (response.status === 200) {
      Swal.fire("Table Details added successfully!");
      navigate("/Add-Menu");
    } else {
      showToast("Failed to add table details", "error");
    }
  };

  return (
    <div className="tableWrapper">
      <div className="container">
        <h2 className="title">Restaurant Reservation System - Add Tables</h2>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Number of Tables:
            <input
              className="input"
              type="number"
              value={numTables}
              onChange={(e) => setNumTables(e.target.value)}
            />
          </label>
          <br />
          <label>
            Table Size:
            <select
              className="select"
              value={tableSize}
              onChange={(e) => setTableSize(parseInt(e.target.value, 10))}
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={6}>6</option>
              <option value={8}>8</option>
            </select>
          </label>
          <br />
          <button className="button" onClick={handleTableDetailsSubmit}>
            Add Table
          </button>
        </form>

        {/* Display added table details */}
        <div className="table-details">
          <h3>Added Table Details</h3>
          <ul>
            {tableDetails.map((entry) => (
              <li key={entry.id} className="table-entry">
                {`No Of tables: ${entry.numTables} Table size: ${entry.tableSize}`}
                <button
                  className="delete-button"
                  onClick={() => handleDeleteEntry(entry.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ToastContainer />
        <button className="post-data-button" onClick={handlePostData}>
          Post Data
        </button>
      </div>
    </div>
  );
};

export default TableDetails;
