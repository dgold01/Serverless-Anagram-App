/*
    Add your game logic here
    Feel free to add other functions or files as needed
*/


let currentIndex = 0;

async function isWordAcceptable(submittedWord, baseString) {
    console.log('test')

    let remaningLeterrs = baseString.split('')

    for (const letter of submittedWord) {
        const index = remaningLeterrs.indexOf(letter)

        if (index === -1) {
            return false
        }
        else {
            remaningLeterrs.splice(index, 1);
        }
    }

    const wordList = await fetchValidWords()
    console.log(wordList)
    if (wordList && !wordList.includes(submittedWord)) {
        return false;
    }

    return true;
}

async function fetchValidWords() {
    try {
        const response = await fetch('http://localhost:3000/dev/fetchWordList');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let wordList = await response.json()
        console.log(wordList) // Get the word list text
       ; // Parse the string as JSON
        console.log(wordList.array)
        return wordList.array;
    } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error('Fetch error:', error);
        return []; // Return an empty array in case of an error
    }
}



function generateRandomString() {
    const possibleLetters = "abcdefghijklmnopqrstuvwxyz";
    const randomLength = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
    let randomString = "";

    for (let i = 0; i < randomLength; i++) {
        const randomIndex = Math.floor(Math.random() * possibleLetters.length);
        randomString += possibleLetters[randomIndex];
    }
    return randomString;

}





async function submitWord() {
    const word = document.getElementById("UserInput").value;
    const baseString = document.getElementById("BaseString").value;
    const isWord = await isWordAcceptable(word, baseString)
    if (isWord) {
        currentIndex++
        addHighScore(word, word.length, currentIndex);
    }


}

function addHighScore(word, score, index) {
    var highScoresTable = document.getElementById("HighScoresTable");
    var row = highScoresTable.insertRow(index);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = word;
    cell2.innerHTML = score;
}

function getGreetingFromServer() {
    fetch("http://localhost:3000/hello")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson.message);
        })
        .catch(function (error) {
            console.log("Error: " + error);
        });
}
