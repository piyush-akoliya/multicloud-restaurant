const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const axios = require("axios");

module.exports.getFoodMenuForRestaurants = async (event) => {
  const restaurantId = event.restaurant_id;
  console.log("Reached here");
  const params = {
    TableName: "restaurants",
    Key: {
      restaurant_id: restaurantId,
    },
  };
  console.log("Reached here");
  try {
    const data = await dynamodb.get(params).promise();
    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Restaurant not found" }),
      };
    }
    console.log("Reached here");
    console.log(foodMenu);
    // Extract the food menu items
    const foodMenu = data.Item.restaurant_food_menu.L;

    return {
      statusCode: 200,
      body: JSON.stringify({ foodMenu }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error retrieving restaurant data" }),
    };
  }
};
