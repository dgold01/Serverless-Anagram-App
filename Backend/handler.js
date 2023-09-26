const axios = require('axios');

export const fetchWordList = async (event, context) => {
  try {
    const response = await axios.get('https://code-test-resources.s3.eu-west-2.amazonaws.com/wordlist.txt');


    if (response.status !== 200) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }

    const wordListText = await response.data;
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


const AWS = require('aws-sdk');

export const storeHighScore = async (event, context) => {

  const db = new AWS.DynamoDB.DocumentClient();
  const requestBody = JSON.parse(event.body);
  const params = {
    TableName: 'highscoreTable',
    Item: {
      word: requestBody.word,
      data: requestBody.score
    },
  };

  try {
    await db.put(params).promise();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
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