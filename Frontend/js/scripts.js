/*
    Add your game logic here
    Feel free to add other functions or files as needed
*/




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





function submitWord() {
    // var word = document.getElementById("UserInput").value;

    // ...

    // addHighScore(word, score, index);
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
