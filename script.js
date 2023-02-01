const letters = "abcdefghijklmnopqrstuvwxyz',";
const words = [
  "Choose what you lose",
  "Choose or lose",
  "Albert Einstein",
  "Egypt is the mother of the world",
  "Hold your horses",
  "Never would have guessed",
  "Yesterday, wouldn't be too soon",
  "Have it your way",
  "You'll get the hang of if",
  "Vamoose",
  "A for effort",
];

let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");

lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  let aLetter = document.createTextNode(letter);
  span.appendChild(aLetter);
  span.className = "letter-box";
  lettersContainer.appendChild(span);
});

let randomNumber = Math.floor(Math.random() * words.length);
let randomWord = words[randomNumber];

let lettersAndSpace = Array.from(randomWord);
// console.log(lettersAndSpace);
let correctAttempts = 0;

let lettersGuess = document.querySelector(".letters-guess");
lettersAndSpace.forEach((letter) => {
  let emptySpan = document.createElement("span");
  if (letter === " ") {
    correctAttempts++;
    emptySpan.className = "with-space";
  }
  lettersGuess.appendChild(emptySpan);
});

let guessSpans = document.querySelectorAll(".letters-guess span");
let wrongAttempts = 0;

let theDraw = document.querySelector(".hangman-draw");

document.addEventListener("click", (e) => {
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    let theClickedLetter = e.target.innerHTML.toLowerCase();
    let theChosenWord = Array.from(randomWord.toLowerCase());

    theChosenWord.forEach((wordLetter, wordIndex) => {
      if (theClickedLetter === wordLetter) {
        theStatus = true;
        correctAttempts++;

        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) span.innerHTML = theClickedLetter;
        });
      }
    });

    if (!theStatus) {
      wrongAttempts++;
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      if (wrongAttempts === 4) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    }

    if (correctAttempts === randomWord.length) {
      finalGame();
      lettersContainer.classList.add("finished");
    }
  }
});

endGame = () => {
  let div = document.createElement("div");
  let divText = document.createTextNode("Game Over 💥💥");
  div.appendChild(divText);

  div.className = "popup";
  document.body.appendChild(div);
};

finalGame = () => {
  let div = document.createElement("div");
  let divText = document.createTextNode("Congratulation 🎉👌👏🎉");
  div.appendChild(divText);
  div.className = "popup";
  document.body.appendChild(div);
};
