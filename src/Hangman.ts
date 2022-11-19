import {prompt} from "enquirer";
import FileManager from "./FileManager";

interface IHangman {
    attemptGuess: (guess: string) => boolean;
    takeInput: (message: string) => Promise<string>;
    createGuessWord: (character: string, length: number) => string;
    checkIfWin: () => boolean;
    getLives: () => number;
    getGuess: () => string;
}

class Hangman implements IHangman {
    private readonly word: string;
    private guess: string;
    private lives: number = 10;

    constructor() {
        const file = new FileManager('./data.json');
        this.word = file.getRandom();
        this.guess = this.createGuessWord('*', this.word.length);
    }

    public createGuessWord(character: string, length: number): string {
        let word = "";
        for (let i = 0; i < length; i++)
            word += character;
        return word;
    }

    public async takeInput(message: string): Promise<string> {
        const input: { char: string } = await prompt({
            type: "input",
            name: "char",
            message,
        });
        const response: string = input.char;

        if (response.length !== 1)
            return response.charAt(0) && "-";

        return response;
    }

    public attemptGuess(guess: string): boolean {
        if (this.lives < 1)
            return false;

        let correct = false;
        for (let i = 0; i < this.word.length; i++) {
            if (this.word.charAt(i) === guess) {
                this.guess = this.replaceCharAt(i, this.guess, guess);
                correct = true;
            }
        }

        if (correct)
            return true;

        this.lives--;
        return false;
    }

    public checkIfWin(): boolean {
        return this.word === this.guess;
    }

    public replaceCharAt(index: number, str: string, char: string): string {
        const {before, after} = {
            before: str.substring(0, index),
            after: str.substring(index + 1),
        };

        return before + char + after;
    }

    public getLives(): number {
        return this.lives;
    }

    public getGuess(): string {
        return this.guess;
    }
}

export default Hangman;
