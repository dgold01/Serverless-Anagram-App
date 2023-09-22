let currentIndex = 0;

/**
 * Check if a submitted word is acceptable based on available letters in baseString
 * and whether it exists in a valid word list.
 * @param {string} submittedWord - The word to be checked.
 * @param {string} baseString - The available letters for forming the word.
 * @returns {boolean} - True if the word is acceptable, false otherwise.
 * @timecomplexity O(n^2), where 'n' is the length of the submittedWord.
 */
async function isWordAcceptable(submittedWord, baseString) {
    let remainingLetters = baseString.split('');

    for (const letter of submittedWord) {
        const index = remainingLetters.indexOf(letter);

        if (index === -1) {
            return false;
        } else {
            remainingLetters.splice(index, 1);
        }
    }

    const wordList = await fetchValidWords();


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

        const wordList = await response.json();
        return wordList.array;
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
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

async function postHighScore(word, highScore) {
    try {
        const response = await fetch('http://localhost:3000/dev/postHighScore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ word, highScore }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Fetch error:', error);
        return { message: 'Error posting high score', error: error.message };
    }
}

// Need to keep track of submitted word so we are not repeating
const submittedWords = new Set();

async function submitWord() {
    const word = document.getElementById("UserInput").value;
    const baseString = document.getElementById("BaseString").value;
    const isWord = await isWordAcceptable(word, baseString);

    if (isWord) {
        // Make sure we are not inputting the same word
        if (!submittedWords.has(word)) {
            submittedWords.add(word);
            currentIndex++;
            addHighScore(word, word.length);
        } else {
            alert("Word already submitted!");
        }
    }
}

const highScores = [];
const MAX_HIGH_SCORES = 10;

function addHighScore(word, score) {
    const entry = { word, score };
    // Insert new high score at the beginning
    highScores.unshift(entry);

    if (highScores.length > MAX_HIGH_SCORES) {
        // Remove the lowest score if there are more than 10 entries
        highScores.pop();
    }

    updateHighScoresTable();
}

function updateHighScoresTable() {
    const highScoresTable = document.getElementById("HighScoresTable");
    // Clear the table first
    highScoresTable.innerHTML = '<tr><th>Word</th><th>Score</th></tr>';

    for (const entry of highScores) {
        const row = highScoresTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerHTML = entry.word;
        cell2.innerHTML = entry.score;
    }
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
