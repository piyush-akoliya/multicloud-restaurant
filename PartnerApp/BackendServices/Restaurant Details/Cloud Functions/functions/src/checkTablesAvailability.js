const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const functions = require("firebase-functions");
const cors = require("cors");
const functionsCloud = require("@google-cloud/functions-framework");

const checkTablesAvailability = functions.https.onRequest(async (req, res) => {
  // Parse the request body
  const requestBody = req.body;
  const { numberOfTables, hour, restaurantId, date } = requestBody;

  // Calculate the reservation timestamp based on the provided date and hour
  const reservationTimestamp = `${date}T${hour}:00:00Z`;

  // Query the database to count reservations for the specified date, hour, and restaurant
  const params = {
    TableName: "reservation",
    IndexName: "restaurantId-reservationTimestamp-index",
    KeyConditionExpression:
      "restaurant_id = :id and reservation_timestamp = :timestamp",
    ExpressionAttributeValues: {
      ":id": restaurantId,
      ":timestamp": reservationTimestamp,
    },
  };

  try {
    const result = await dynamoDB.query(params).promise();

    // Calculate the number of available tables
    const availableTables = numberOfTables - result.Count;

    // Determine if the tables are full or not
    const isFull = availableTables <= 0;

    // Prepare the response
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        isFull,
        availableTables,
      }),
    };

    // Return the response
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    console.error("Error querying the database:", error);

    // Prepare an error response
    const response = {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal Server Error",
      }),
    };

    // Return the error response
    res.status(response.statusCode).json(response.body);
  }
});

// Function to wrap checkTablesAvailability with CORS handling
const wrappedCheckTablesAvailability = (req, res) => {
  cors()(req, res, () => {
    checkTablesAvailability(req, res);
  });
};

exports.handler = wrappedCheckTablesAvailability;

// Register the cloud function
functionsCloud.http("checkTablesAvailability", wrappedCheckTablesAvailability);
