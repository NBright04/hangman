import Hangman from "./Hangman";

const hangman = new Hangman();

const main = async () => {
    while (true) {
        if (hangman.checkIfWin()) {
            console.log("Wygrales");
            break;
        } else if (hangman.getLives() < 1) {
            console.log("Przegrales");
            break;
        }

        console.log(hangman.getGuess());
        hangman.attemptGuess(await hangman.takeInput("input>"));
    }
};

main().then(() => console.log("stopped"));
