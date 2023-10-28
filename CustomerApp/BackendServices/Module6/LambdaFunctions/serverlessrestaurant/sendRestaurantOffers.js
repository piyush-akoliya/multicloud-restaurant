const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const axios = require("axios");

module.exports.sendRestaurantOffers = async (event) => {
  const currentADTtime = getCurrentTimeinHHMM();
  const dayOfWeek = getTodaysDay();

  const params = {
    TableName: "restaurants",
    FilterExpression: "attribute_exists(offers)",
  };
  console.log("Reached here::2");
  try {
    const data = await dynamodb.scan(params).promise();

    console.log("Reached here::3");
    const restaurants = data.Items.map((item) => {
      if (
        item.operating_days[dayOfWeek].opening_time <= currentADTtime + 100 &&
        item.operating_days[dayOfWeek].opening_time > currentADTtime
      ) {
        console.log("In here");
        return {
          restaurant_name: item.restaurant_name,
          offers: item.offers,
        };
      } else {
        console.log(
          "your opening time is ::" +
            item.operating_days[dayOfWeek].opening_time
        );
      }
    });

    // Build the email body using restaurant information
    const emailBody = restaurants
      .map((restaurant) => {
        return `Restaurant Name: ${restaurant.restaurant_name}\nOffers: ${restaurant.offers}`;
      })
      .join("\n\n");

    console.log("Reached here::4");
    const emailData = {
      subject: "Latest Offers!!! Hurry, restaurants open in the next 1 hour",
      body: emailBody,
    };

    console.log("Reached here::5");
    await axios
      .post(
        "https://us-central1-serverless-402501.cloudfunctions.net/getAllUsers",
        emailData
      )
      .then((response) => {
        console.log("Users found successfully.");
        res.status(200).send("Latest offers sent to the users");
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        return res.status(500).send("Error fetching users");
      });
    console.log(restaurants);
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "An error occurred while querying the database.",
      }),
    };
  }
};

function getTodaysDay() {
  const currentDate = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // Get the day of the week as an integer (0 for Sunday, 1 for Monday, etc.)
  const dayOfWeek = currentDate.getDay();
  return dayOfWeek;
}

function getCurrentTimeinHHMM() {
  const atlanticTimeZone = "America/Halifax"; // Time zone for Atlantic Daylight Time
  const options = {
    timeZone: atlanticTimeZone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  };
  const now = new Date();
  const currentadtTime = parseInt(
    new Intl.DateTimeFormat("en-US", options).format(now).replace(":", ""),
    10
  );
  console.log("Current Atlantic Daylight Time (HHMM):", currentadtTime);
  return currentadtTime;
}
