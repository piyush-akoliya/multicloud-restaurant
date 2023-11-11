const AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = "restaurants";

module.exports.addOperationsDetails = async (event) => {
  const requestBody = JSON.parse(event.body);
  const restaurantId = requestBody.restaurant_id;
  const operationDetails = requestBody.restaurant_operation_details;

  console.log("Reached here ::");
  console.log("restaurantId" + restaurantId);
  console.log("operationDetails" + operationDetails);

  const params = {
    TableName: tableName,
    Key: {
      restaurant_id: restaurantId,
    },
    UpdateExpression: "SET restaurant_operation_details = :details",
    ExpressionAttributeValues: {
      ":details": operationDetails,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const result = await dynamoDB.update(params).promise();
    console.log("Operation details added successfully:", result);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Operation details added successfully" }),
    };
  } catch (error) {
    console.error("Error adding operation details:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
