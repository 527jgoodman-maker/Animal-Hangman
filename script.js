// ── Word banks ─────────────────────────────────────────────────
// Three lists of animals, one per difficulty level
const wordBanks = {
  easy:   ['lion', 'tiger', 'bear', 'zebra', 'panda', 'giraffe', 'monkey', 'elephant', 'rabbit', 'fox'],
  medium: ['kangaroo', 'alligator', 'chimpanzee', 'hippopotamus', 'crocodile', 'flamingo', 'gorilla', 'penguin', 'raccoon', 'platypus'],
  hard:   ['saltwatercrocodile', 'snowleopard', 'greatwhiteshark', 'humpbackwhale', 'siberiantiger', 'komododragon', 'arcticfox', 'blueringedoctopus', 'mantisshrimp', 'axolotl']
};

// ── Game state ─────────────────────────────────────────────────
let secretWord      = "";   // the word the player is trying to guess
let guessedLetters  = [];   // all letters the player has tried
let guessesLeft     = 6;    // how many wrong guesses remain
let maxWrong        = 6;    // max wrong guesses for the chosen difficulty
let currentDifficulty = ""; // "easy", "medium", or "hard"
let gameOver        = false; // true once the player wins or loses


// ── selectDifficulty ───────────────────────────────────────────
// Runs when the player clicks a difficulty button in the popup.
// Saves the difficulty, hides the popup, then starts the game.
function selectDifficulty(difficulty) {
  currentDifficulty = difficulty;
  document.getElementById('popup').style.display = 'none';
  startGame(difficulty);
}


// ── startGame ──────────────────────────────────────────────────
// Picks a random word, resets all variables, and refreshes the screen.
function startGame(difficulty) {
  // Pick a random word from the right list
  let bank = wordBanks[difficulty];
  secretWord = bank[Math.floor(Math.random() * bank.length)];

  // Reset game state
  guessedLetters = [];
  gameOver = false;

  // Set how many wrong guesses are allowed per difficulty
  if (difficulty === 'easy')        maxWrong = 6;
  else if (difficulty === 'medium') maxWrong = 6;
  else if (difficulty === 'hard')   maxWrong = 6;

  guessesLeft = maxWrong;

  // Re-enable input and guess button (in case they were disabled)
  document.getElementById('guess-input').disabled  = false;
  document.getElementById('guess-button').disabled = false;

  // Clear any leftover win/lose message
  document.getElementById('message').textContent = '';

  updateDisplay();

  console.log(secretWord); // shows the answer in the console for testing
}


// ── updateDisplay ──────────────────────────────────────────────
// Refreshes the word, guessed letters, guesses left, and health bar.
// Called after every guess and at the start of each game.
function updateDisplay() {

  // from the javascript refrence
  let wordDisplay = "";
  for (let i = 0; i < secretWord.length; i++) {
    let letter = secretWord.charAt(i);
    if (guessedLetters.includes(letter)) {
      wordDisplay += letter + " ";
    } else {
      wordDisplay += "_ ";
    }
  }
  document.getElementById('wordDisplay').textContent = wordDisplay;

  // Show all guessed letters on screen
  document.getElementById('guessedLetters').textContent =
    guessedLetters.length > 0 ? "Guessed: " + guessedLetters.join(", ") : "";

  // Show guesses remaining
  document.getElementById('guessesLeft').textContent = "Guesses Left: " + guessesLeft;

  // got this healthb bar idea from jake
  let healthPercent = (guessesLeft / maxWrong) * 100;
  document.getElementById('healthBar').style.width = healthPercent + "%";
}


// ── handleGuess ────────────────────────────────────────────────
// Runs whenever the player submits a guess (button click or Enter).
function handleGuess() {
  if (gameOver) return; // ignore guesses after the game ends

  let input = document.getElementById('guess-input');
  let guess = input.value.toLowerCase();
  input.value = ""; // clear the input box

  // Must be exactly one letter A–Z 
  // the .test is how it checks if the guessed letter is a single letter from a to z, the ^ means start of string, $ means end of string, and [a-z] means any lowercase letter
  if (guess.length !== 1 || guess < 'a' || guess > 'z') {
    document.getElementById('message').textContent = "Please enter a single letter (A–Z).";
    return;
  }

  // Already guessed this letter — don't count it as a wrong guess
  if (guessedLetters.includes(guess)) {
    document.getElementById('message').textContent = "You already guessed that letter.";
    return;
  }

  // Valid new guess — clear any old message and save the letter
  document.getElementById('message').textContent = '';
  guessedLetters.push(guess);

  // If the letter is NOT in the word, subtract one guess
  if (!secretWord.includes(guess)) {
    guessesLeft--;
  }

  updateDisplay();

  // Check win: every letter in the word has been guessed
  if (checkWin()) {
    endGame(true);
    return;
  }

  // Check lose: no guesses left
  if (guessesLeft <= 0) {
    endGame(false);
  }
}


// ── checkWin ───────────────────────────────────────────────────
// Returns true if every letter in the secret word has been guessed.
function checkWin() {
  for (let i = 0; i < secretWord.length; i++) {
    if (!guessedLetters.includes(secretWord.charAt(i))) {
      return false; // found an un-guessed letter, not a win yet
    }
  }
  return true;
}


// ── endGame ────────────────────────────────────────────────────
// Shows a win or lose message and disables guessing.
function endGame(won) {
  gameOver = true;

  let message = document.getElementById('message');
  if (won) {
    message.textContent = "You won! The word was: " + secretWord;
    message.style.color = "green";
  } else {
    message.textContent = "You lost! The word was: " + secretWord;
    message.style.color = "red";
  }

  // .disabled makes the input box useless so the player cant keep guessing after the game ends but only when true
  document.getElementById('guess-input').disabled  = true;
  document.getElementById('guess-button').disabled = true;
}


// ── restartGame ────────────────────────────────────────────────
// Resets everything and shows the difficulty popup again.
function restartGame() {
  // Clear all game state
  secretWord        = "";
  guessedLetters    = [];
  guessesLeft       = 6;
  maxWrong          = 6;
  currentDifficulty = "";
  gameOver          = false;

  // Reset the screen
  document.getElementById('wordDisplay').textContent    = "_ _ _ _ _ _ _ _";
  document.getElementById('guessedLetters').textContent = "";
  document.getElementById('guessesLeft').textContent    = "Guesses Left: 6";
  document.getElementById('message').textContent        = "";
  document.getElementById('healthBar').style.width      = "100%";

  // Re-enable input
  document.getElementById('guess-input').disabled  = false;
  document.getElementById('guess-button').disabled = false;

  // Show the difficulty popup again
  document.getElementById('popup').style.display = 'flex';
}


// ── Event listeners ────────────────────────────────────────────
// Guess button click
document.getElementById('guess-button').addEventListener('click', handleGuess);

// Enter key inside the input box
document.getElementById('guess-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') handleGuess();
});

// Restart button click
document.getElementById('restart-button').addEventListener('click', restartGame);