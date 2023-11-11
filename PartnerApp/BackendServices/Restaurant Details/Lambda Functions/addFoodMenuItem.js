const AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = "restaurants";

module.exports.addFoodMenuItem = async (event) => {
  const requestBody = JSON.parse(event.body);
  const restaurantId = requestBody.restaurant_id;
  const newFoodMenuItem = requestBody.food_menu_item;

  if (!restaurantId || !newFoodMenuItem) {
    console.error(
      "Invalid input. Both restaurant_id and food_menu_item are required."
    );
    return {
      statusCode: 400,
      body: JSON.stringify({
        error:
          "Invalid input. Both restaurant_id and food_menu_item are required.",
      }),
    };
  }

  // Fetch the existing menu items from DynamoDB
  const getParams = {
    TableName: tableName,
    Key: {
      restaurant_id: restaurantId,
    },
  };

  try {
    const getResult = await dynamoDB.get(getParams).promise();
    const existingFoodMenuItems = getResult.Item?.restaurant_food_menu || [];

    // Add the new food menu item to the existing array
    existingFoodMenuItems.push(newFoodMenuItem);

    // Update the DynamoDB table with the modified array
    const updateParams = {
      TableName: tableName,
      Key: {
        restaurant_id: restaurantId,
      },
      UpdateExpression: "SET restaurant_food_menu = :menuItems",
      ExpressionAttributeValues: {
        ":menuItems": existingFoodMenuItems,
      },
      ReturnValues: "UPDATED_NEW",
    };

    const updateResult = await dynamoDB.update(updateParams).promise();
    console.log("Food menu item added successfully:", updateResult);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Food menu item added successfully" }),
    };
  } catch (error) {
    console.error("Error adding food menu item:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
