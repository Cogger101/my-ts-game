import "./styles/style.scss";
import { hangmanDrawing, resetHangmanDrawing } from "./hangmanDrawing";
import { alphabet, options, Options } from "./data";

const keyboardContainer = document.querySelector<HTMLDivElement>(".keyboard");
const wordDisplayContainer =
    document.querySelector<HTMLUListElement>(".word-display");
const optionsContainer =
    document.querySelector<HTMLDivElement>(".options-container");
const wrongGuessMsg =
    document.querySelector<HTMLDivElement>(".wrong-guess-msg");
const gameOverModal = document.querySelector<HTMLDivElement>(".game-over");
const gameContainer = document.querySelector<HTMLDivElement>(".game-container");

if (
    !keyboardContainer ||
    !wordDisplayContainer ||
    !optionsContainer ||
    !wrongGuessMsg ||
    !gameOverModal ||
    !gameContainer
) {
    throw new Error(
        "Can't find div for keyboard/options/wrongGuessMsg/gameOver container or UL for word display container"
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
            keyboardLetterBtn.disabled = true;
            keyboardLetterBtn.classList.add("keyboard__letter--disabled");
        });
        keyboardContainer.appendChild(keyboardLetterBtn);
    });
};
keyboard();
// options[selectedCatagory] type

// creating catagory selection and selecting a random word from array in data object
let targetWord = "";
let selectedCatagory: string = "";
const catagoriesArr = ["animals", "cities", "countries"];
const categorySelection = () => {
    catagoriesArr.forEach((catagory) => {
        const catagoriesBtn = document.createElement("button");
        catagoriesBtn.textContent = catagory;
        catagoriesBtn.classList.add("options-container__catagory-btn");
        // Select a random word depending on the category selected
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
                // Create word display placeholders ('_')
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

let incorrectLetters: string[] = [];

const incorrectLetterCount = (): number => {
    return incorrectLetters.length;
};

// game over modal function

const showGameOverModal = (message: string) => {
    const modal = document.querySelector<HTMLDivElement>("#modal");
    // creating the modal and the display message
    if (modal) {
        modal.innerHTML = `
    <div class='gove-over-content'>
    <h2>${message}<h2>
    ${
        message === "You Lose! Game Over!!"
            ? `<p>The word was <strong> ${targetWord}</strong></p>`
            : "<p>Congratulations! You Win!!</p>"
    }
    <button id="play-again-btn" class="game-over__play-again">Play Again</button>
    </div>
    `;
        // show game over modal
        modal.classList.add("show");
        const playAgainBtn = modal.querySelector("#play-again-btn");
        playAgainBtn?.addEventListener("click", resetGame);
    }
};

// adding the reset game function to allow you to restart the game from the modal
const resetGame = () => {
    const modal = document.querySelector("#modal");
    if (modal) {
        modal?.classList.remove("show");
        modal.innerHTML = "";
    }
    incorrectLetters = [];
    resetHangmanDrawing();
    const keyboardBtns =
        keyboardContainer.querySelectorAll<HTMLButtonElement>(
            ".keyboard__letter"
        );
    keyboardBtns.forEach((btn) => {
        btn.disabled = false;
        btn.classList.remove("keyboard__letter--disabled");
    });
    guessedLetters.length = 0;
    targetWord = "";
    selectedCatagory = "";
    const wordDisplay = wordDisplayContainer.querySelectorAll<HTMLLIElement>(
        ".word-display__letter"
    );
    wordDisplay.forEach((li) => (li.textContent = ""));
    console.log("New game started");
    wrongGuessMsg.textContent = "";
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
            // checking for a win - all letters match
            const isWin = Array.from(wordDisplay).every(
                (li) => li.textContent !== "_"
            );
            if (isWin) {
                showGameOverModal("Well Done");
            }
        } else {
            // handling incorrect guesses
            incorrectLetters.push(key);

            let incorrectCount = incorrectLetterCount();
            hangmanDrawing(incorrectCount);

            // handling wrong letter guesses msg
            wrongGuessMsg.textContent = "";
            const wrongLetter = document.createElement("p");
            wrongLetter.textContent = `${key} is not in the word.`;
            wrongLetter.className = "wrong-guess-msg__wrong-letter";
            wrongGuessMsg.appendChild(wrongLetter);

            // Game over You LOSE
            if (incorrectLetters.length >= maxWrongGuesses) {
                showGameOverModal("You Lose! Game Over!!");
            }
        }
    }
};

// Reveal the solution when a player gives up
const solutionBtn = document.querySelector<HTMLButtonElement>(
    ".in-game-btn__solution"
);

if (!solutionBtn) {
    throw new Error("Can't find solution Btn");
}

solutionBtn.addEventListener("click", () => {
    const existingSolution = document.querySelector(
        ".in-game-btn__solution--reveal"
    );
    if (!existingSolution) {
        const revealSolution = document.createElement("h1");
        revealSolution.textContent = `The word was ${targetWord}`;
        revealSolution.className = "in-game-btn__solution--reveal";
        console.log(revealSolution);

        const gameContainer = document.querySelector(".game-container");
        gameContainer?.appendChild(revealSolution);
    } else {
        console.log("Solution already revealed");
    }
});
// Reset the game

const newGameBtn = document.querySelector<HTMLButtonElement>(
    ".in-game-btn__new-game"
);
if (!newGameBtn) {
    throw new Error("Can't find new game btn element");
}
newGameBtn.addEventListener("click", () => {
    incorrectLetters = [];
    resetHangmanDrawing();
    const keyboardBtns =
        keyboardContainer.querySelectorAll<HTMLButtonElement>(
            ".keyboard__letter"
        );
    keyboardBtns.forEach((btn) => {
        btn.disabled = false;
        btn.classList.remove("keyboard__letter--disabled");
    });
    guessedLetters.length = 0;
    targetWord = "";
    selectedCatagory = "";
    const wordDisplay = wordDisplayContainer.querySelectorAll<HTMLLIElement>(
        ".word-display__letter"
    );
    wordDisplay.forEach((li) => (li.textContent = ""));
    console.log("New game started");

    // resetting wrong letter guess msg

    wrongGuessMsg.textContent = "";

    // Removing revealed solution if its been displayed

    const revealSolution = document.querySelector(
        ".in-game-btn__solution--reveal"
    );
    if (revealSolution) revealSolution.remove();
});

// Add event listener for physical keyboard inputs

document.addEventListener("keydown", (event) => {
    const key = event.key.toUpperCase();
    if (/^[A-Z]$/.test(key)) {
        handleLetterClicks(key);
    }
});
