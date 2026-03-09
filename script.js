const secretEasyWord = ['Lion', 'Tiger', 'Bear', 'Zebra', 'Panda'];
const secretMediumWord = ['Penguin', 'Elephant', 'Giraffe', 'Zebra', 'Gorilla'];
const secretHardWord = ['Polar Bear', 'Tiger', 'Bear', 'Zebra', 'Panda'];



// Listen for the event that fires when the HTML page finishes loading
document.addEventListener("DOMContentLoaded", function () {
 // Any code inside this function will run
 // as soon as the page is fully loaded
 startGame();
});


function startGame(difficulty) {
    if (difficulty === 'easy') {
      let randomWord = secretEasyWord[Math.floor(Math.random() * secretEasyWord.length)];
    } else if (difficulty === 'medium') {
      let randomWord = secretMediumWord[Math.floor(Math.random() * secretMediumWord.length)];
    } else if (difficulty === 'hard') {
      let randomWord = secretHardWord[Math.floor(Math.random() * secretHardWord.length)];
    }
  console.log(randomWord);
}

