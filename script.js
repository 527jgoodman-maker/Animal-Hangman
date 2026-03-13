const secretEasyWord = ['Lion', 'Tiger', 'Bear', 'Zebra', 'Panda'];
const secretMediumWord = ['Penguin', 'Whale', 'Shark', 'Dolphin', 'Kangaroo'];
const secretHardWord = ['PolarBear', 'Elephant', 'Giraffe', 'Gorilla', 'Rhinoceros'];

let secretWord = "";
let guessedLetters = [];
let maxWrong = 6;
let guessesLeft = 6;

// Listen for the event that fires when the HTML page finishes loading
document.addEventListener("DOMContentLoaded", function () {
 // Any code inside this function will run
 // as soon as the page is fully loaded
 startGame();
});


function startGame(difficulty) {


    if (difficulty === 'easy') {
     secretWord = secretEasyWord[Math.floor(Math.random() * secretEasyWord.length)];
    } else if (difficulty === 'medium') {
     secretWord = secretMediumWord[Math.floor(Math.random() * secretMediumWord.length)];
    } else if (difficulty === 'hard') {
     secretWord = secretHardWord[Math.floor(Math.random() * secretHardWord.length)];
    }

    guessedLetters = [];
    updateWordDisplay();
}

// Got this from jake
let healthPercent = (guessesLeft / maxWrong) * 100;
  document.getElementById("healthBar").style.width = healthPercent + "%";

function updateWordDisplay() {
  let display = "";
  for (let i = 0; i < secretWord.length; i++) {
    let letter = secretWord.charAt(i);
    if (guessedLetters.includes(letter)) {
      display += letter + " ";
    } else {
      display += "_ ";
    }
  }
  document.getElementById("wordDisplay").textContent = display;
  document.getElementById("guessedLetters").textContent = guessedLetters.join(" ")
console.log(secretWord);
}  

