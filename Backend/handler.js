
const AWS = require('aws-sdk');
const axiosService = require('./axiosService');

export const fetchWordList = async (event, context) => {
  try {

    const wordListText = await axiosService.fetchData('https://code-test-resources.s3.eu-west-2.amazonaws.com/wordlist.txt');
    const wordListArray = wordListText.split('\n');
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        array: wordListArray,
      }),
    };
  } catch (error) {
    console.error('Fetch error:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: 'Internal Server Error',
      }),
    };
  }
};


export const fetchScores = async (event, context) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient();


  const tableName = 'highscoreTable';

  // Define the parameters for the scan operation
  const params = {
    TableName: tableName,
  };

  try {
    const data = await dynamodb.scan(params).promise();
    const items = data.Items;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        objectArray: items,
      }),
    };
  } catch (error) {
    console.error('Fetch error:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: 'Internal Server Error',
      }),
    };
  }
};


export const storeHighScore = async (event, context) => {

  const db = new AWS.DynamoDB.DocumentClient();
  const requestBody = JSON.parse(event.body);
  const params = {
    TableName: 'highscoreTable',
    Item: {
      word: requestBody.word,
      score: requestBody.word.length
    },
  };

  try {
    await db.put(params).promise();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        'Content-Type': 'application/json',
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ message: 'Item inserted succesfully' }),
    };
  }
  catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      headers: {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
        },
      },
      body: JSON.stringify({ message: 'Error inserting item', error }),
    };
  }
};