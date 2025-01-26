import "./styles/style.scss";
import { hangmanDrawing } from "./hangmanDrawing";
import { alphabet, options, Options } from "./data";

const keyboardContainer = document.querySelector<HTMLDivElement>(".keyboard");
const wordDisplayContainer =
    document.querySelector<HTMLUListElement>(".word-display");
const optionsContainer =
    document.querySelector<HTMLDivElement>(".options-container");
// const wrongGuessCounter =
//     document.querySelector<HTMLDivElement>(".wrong-guess-msg");
// const wrongGuessMsg =
//     document.querySelector<HTMLDivElement>(".wrong-guess-msg");

if (!keyboardContainer || !wordDisplayContainer || !optionsContainer) {
    throw new Error(
        "Can't find div for keyboard/options container or UL for word display container"
    );
}

// Generate keyboard buttons function
const keyboard = () => {
    alphabet.forEach((letter) => {
        const keyboardLetterBtn = document.createElement("button");
        keyboardLetterBtn.textContent = letter;
        keyboardLetterBtn.classList.add("keyboard__letter");

        keyboardLetterBtn.addEventListener("click", () => {
            console.log(`${letter} button was clicked on the keyboard`);
            handleLetterClicks(letter);
        });
        keyboardContainer.appendChild(keyboardLetterBtn);
    });
};
keyboard();

// creating catagory selection and selecting a random word from data object
let targetWord = "";
let selectedCatagory = "";
const catagoriesArr = ["animals", "cities", "countries"];
const categorySelection = () => {
    catagoriesArr.forEach((catagory) => {
        let catagoriesBtn = document.createElement("button");
        catagoriesBtn.textContent = catagory;
        catagoriesBtn.classList.add("options-container__catagory-btn");

        catagoriesBtn.addEventListener("click", () => {
            console.log(`${catagory} was clicked`);
            selectedCatagory = catagoriesBtn.innerHTML ?? "";
            // console.log(selectedCatagory, "inside for each");
            if (selectedCatagory !== "") {
                const randomIndex = Math.floor(
                    Math.random() * options[`${selectedCatagory}`].length
                );
                targetWord =
                    options[selectedCatagory][randomIndex].toUpperCase();
                console.log(targetWord, "targetWord");
                const wordArr = targetWord.split("");
                // Create word display placeholders
                wordDisplayContainer.innerHTML = "";
                console.log(wordArr);
                wordArr.forEach(() => {
                    const li = document.createElement("li");
                    li.className = "word-display__letter";
                    li.textContent = "_";
                    wordDisplayContainer.appendChild(li);
                });
            }
        });
        optionsContainer.appendChild(catagoriesBtn);
    });
};
categorySelection();

// Max incorrect guesses
const maxWrongGuesses = 6;

const guessedLetters: string[] = [];
//Counter for incorect letters guessed

const incorrectLetters: string[] = [];

const incorrectLetterCount = (): number => {
    return incorrectLetters.length;
};

// Matching the keyboard and word display inputs

const handleLetterClicks = (key: string) => {
    key = key.toUpperCase();
    if (/^[A-Z]$/.test(key) && !guessedLetters.includes(key)) {
        guessedLetters.push(key);

        let wordDisplay = wordDisplayContainer.querySelectorAll<HTMLLIElement>(
            ".word-display__letter"
        );
        if (targetWord.includes(key)) {
            targetWord.split("").forEach((letter, index) => {
                if (letter === key) {
                    wordDisplay[index].textContent = key;
                }
            });
        } else {
            incorrectLetters.push(key);
            console.log(`${key} is not in the word.`);
            const incorrectCount = incorrectLetterCount();
            hangmanDrawing(incorrectCount);

            if (incorrectLetters.length > maxWrongGuesses) {
                console.log("Game Over");
            }
        }
    }
};

console.log(incorrectLetters, "<=== incorect letters");

// Reset the game

const newGameBtn = document.querySelector<HTMLButtonElement>(
    ".in-game-btn__new-game"
);
if (!newGameBtn) {
    throw new Error("Can't find new game btn element");
}
newGameBtn.addEventListener("click", () => {
    guessedLetters.length = 0;
    const wordDisplay = wordDisplayContainer.querySelectorAll<HTMLLIElement>(
        ".word-display__letter"
    );
    wordDisplay.forEach((li) => (li.textContent = "_"));
    console.log("New game started");
});

// Add event listener for physical keyboard inputs

document.addEventListener("keydown", (event) => {
    const key = event.key.toUpperCase();
    if (/^[A-Z]$/.test(key)) {
        handleLetterClicks(key);
    }
});
