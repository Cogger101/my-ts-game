const hangmanDrawingContainer =
    document.querySelector<HTMLDivElement>(".hangman-drawing");

if (!hangmanDrawingContainer) {
    throw new Error("Can't find hangman drawing container");
}
export const hangmanDrawing = (incorrectLetterCount: number) => {
    const hangmanParts = [
        ".hangman-drawing__head",
        ".hangman-drawing__body",
        ".hangman-drawing__left-arm",
        ".hangman-drawing__right-arm",
        ".hangman-drawing__left-leg",
        ".hangman-drawing__right-leg",
    ];
    hangmanParts.forEach((selected, index) => {
        const part = document.querySelector<HTMLDivElement>(selected);
        if (part) {
            part.classList.toggle("visible", index < incorrectLetterCount);
        }
    });
};
