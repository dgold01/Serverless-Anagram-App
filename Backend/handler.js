export const fetchWordList = async (event, context) => {
  try {
    const response = await fetch('https://code-test-resources.s3.eu-west-2.amazonaws.com/wordlist.txt');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const wordListText = await response.text();
    const wordListArray = wordListText.split('\n');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        array: wordListArray,
      }),
    };
  } catch (error) {
    console.error('Fetch error:', error);

    return {
      statusCode: 500, // or any appropriate error status code
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Internal Server Error',
      }),
    };
  }
};
