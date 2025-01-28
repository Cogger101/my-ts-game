const hangmanDrawingContainer =
    document.querySelector<HTMLDivElement>(".hangman-drawing");

if (!hangmanDrawingContainer) {
    throw new Error("Can't find hangman drawing container");
}

const hangmanParts = [
    ".hangman-drawing__head",
    ".hangman-drawing__body",
    ".hangman-drawing__left-arm",
    ".hangman-drawing__right-arm",
    ".hangman-drawing__left-leg",
    ".hangman-drawing__right-leg",
];

// adds hangman parts with unmatched letters
export const hangmanDrawing = (incorrectCount: number) => {
    hangmanParts.forEach((selected, index) => {
        const part = document.querySelector<HTMLDivElement>(selected);
        if (part) {
            part.classList.toggle("visible", index < incorrectCount);
        }
    });
};
// function to add to new game button to allow hangman to refresh
export const resetHangmanDrawing = () => {
    hangmanParts.forEach((selected) => {
        const part = document.querySelector<HTMLDivElement>(selected);
        if (part?.classList.contains("visible")) {
            part.classList.remove("visible");
        }
    });
};
