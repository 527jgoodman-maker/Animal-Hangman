const secretEasyWord = ['lion', 'tiger', 'bear', 'zebra', 'panda', 'giraffe', 'monkey', 'elephant', 'rabbit', 'fox'];
const secretMediumWord = ['kangaroo', 'alligator', 'chimpanzee', 'hippopotamus', 'crocodile', 'flamingo', 'gorilla', 'penguin', 'raccoon'];
const secretHardWord = ['saltwatercrocodile', 'snowleopard', 'greatwhiteshark', 'humpbackwhale', 'siberiantiger',];

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

// Restart game (no page reload)
function restartGame() {
  if (!currentDifficulty) return; // no difficulty selected yet

  // Reset variables
  guessedLetters = [];
  guessesLeft = maxWrong;

  // Re-run the same difficulty
  startGame(currentDifficulty);
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
 document.getElementById("guessesLeft").textContent = wrongLetters.join(", ") + " Guesses Left: " + guessesLeft;

console.log(secretWord);
}  

document.getElementById("restart-button").addEventListener("click", function () {
  restartGame();
});


function restartGame() {
  // Reset game variables
  guessedLetters = [];
  guessesLeft = maxWrong;
  secretWord = "";

  // Show the popup again
  document.getElementById("popup").style.display = "flex";

  // Clear the UI
  document.getElementById("wordDisplay").textContent = "_ _ _ _ _ _ _ _";
  document.getElementById("guessedLetters").textContent = "";
  document.getElementById("healthBar").style.width = "100%";
  
}

document.getElementById("guess-button").addEventListener("click", function () {
  let input = document.getElementById("guess-input");
  let guess = input.value.toLowerCase();

  input.value = "";

  // ignore empty or repeated guesses
  if (!guess || guess.length !== 1 || guessedLetters.includes(guess)) return;

  // add guess
  guessedLetters.push(guess);

  // check if wrong
  if (!secretWord.toLowerCase().includes(guess)) {
    guessesLeft--;
  }

  // update display
  updateWordDisplay();
});

let wrongLetters = guessedLetters.filter (letter => !secretWord.includes(letter));

document.getElementById("guessesLeft").textContent = wrongLetters.join(", ") + " Guesses Left: " + guessesLeft;

function endGame(won) {
  let message = document.getElementById("message");

  if (won) {
    message.textContent = "you lost! the word was: " + secretWord;
    message.style.color = "red";
  } else {
    message.textContent = "you won! the word was: " + secretWord;
    message.style.color = "green";
  }

  document.getElementById("guess-Input").disabled = true;
  document.getElementById("guess-button").disabled = true;
  document.getElementById("message").textContent = '';

  if (!secretWord.toLowerCase().includes(guess)) {
    guessesLeft--;
  }
}
if (guessesLeft <= 0) {
  endGame(false); // player loses
}