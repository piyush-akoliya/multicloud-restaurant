const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    const params = {
        TableName: 'restaurants'
    };

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    };

    try {
        const data = await dynamoDB.scan(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items),
            headers: headers,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error.message),
            headers: headers,
        };
    }
};
