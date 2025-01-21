import "./styles/style.scss";
import { alphabet, animals, cities, countries } from "./data";

const keyboard = document.querySelector<HTMLDivElement>(".keyboard");
const wordDisplayContainer =
    document.querySelector<HTMLUListElement>(".word-display");

if (!keyboard || !wordDisplayContainer) {
    throw new Error(
        "Can't find div for keyboard or UL for word display container"
    );
}

// Generate keyboard buttons

alphabet.forEach((letter) => {
    const keyboardLetterBtn = document.createElement("button");
    keyboardLetterBtn.textContent = letter;
    keyboardLetterBtn.classList.add("keyboard__letter");

    keyboardLetterBtn.addEventListener("click", () => {
        console.log(`${letter} button was clicked on the keyboard`);
        handleLetterClicks(letter);
    });
    keyboard.appendChild(keyboardLetterBtn);
});

// Selecting a random word from data (animals array to start with)

const targetWord = animals[Math.floor(Math.random() * animals.length)]
    .toUpperCase()
    .split("");
console.log(targetWord);
const guessedLetters: string[] = [];

// Create word display placeholders

wordDisplayContainer.innerHTML = "";
targetWord.forEach(() => {
    const li = document.createElement("li");
    li.className = "word-display__letter";
    li.textContent = "_";
    wordDisplayContainer.appendChild(li);
});

const wordDisplay = wordDisplayContainer.querySelectorAll<HTMLLIElement>(
    ".word-display__letter"
);

// Match/handle the keyboard and word display inputs

const handleLetterClicks = (key: string) => {
    key = key.toUpperCase();
    if (/^[A-Z]$/.test(key) && !guessedLetters.includes(key)) {
        guessedLetters.push(key);
        if (targetWord.includes(key)) {
            targetWord.forEach((letter, index) => {
                if (letter === key) {
                    wordDisplay[index].textContent = key;
                }
            });
        } else {
            console.log(`${key} is not in the word.`);
        }
    }
};

// Reset the game

const newGameBtn = document.querySelector<HTMLButtonElement>(
    ".in-game-btn__new-game"
);
newGameBtn?.addEventListener("click", () => {
    guessedLetters.length = 0;
    wordDisplay.forEach((li) => (li.textContent = "_"));
    console.log("New game started");
});
