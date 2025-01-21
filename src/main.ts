import "./styles/style.scss";
import { alphabet, animals, cities, countries } from "./data";

const keyboard = document.querySelector<HTMLDivElement>(".keyboard");

if (!keyboard) {
    throw new Error("Can't find keyboard div element");
}

alphabet.forEach((letter) => {
    const keyboardLetterBtn = document.createElement("button");
    keyboardLetterBtn.textContent = letter;
    keyboardLetterBtn.classList.add("keyboard__letter");

    keyboardLetterBtn.addEventListener("click", () => {
        console.log(`${letter} button was clicked on the keyboard`);
    });
    keyboard.appendChild(keyboardLetterBtn);
});
