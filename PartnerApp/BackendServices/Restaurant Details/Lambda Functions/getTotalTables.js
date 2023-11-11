const AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = "restaurants";

module.exports.getTotalTables = async (event) => {
  const restaurantId = event.pathParameters.restaurantId;
  // const restaurantId = requestBody.restaurantId;

  if (!restaurantId) {
    console.error("Invalid input. restaurantId is required.");
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Invalid input. restaurantId is required.",
      }),
    };
  }

  // Fetch the restaurant details from DynamoDB
  const getParams = {
    TableName: tableName,
    Key: {
      restaurant_id: restaurantId,
    },
  };

  try {
    const getResult = await dynamoDB.get(getParams).promise();

    if (!getResult.Item) {
      console.error("Restaurant not found.");
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Restaurant not found." }),
      };
    }

    const totalTables = getResult.Item.restaurant_number_of_tables || 0;

    return {
      statusCode: 200,
      body: JSON.stringify({ total_tables: totalTables }),
    };
  } catch (error) {
    console.error("Error retrieving total tables:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
