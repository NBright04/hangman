import * as fs from 'fs';

interface IFile {
    readFile: (path: string) => string[];
    getRandom: () => string;
}

class FileManager implements IFile {
    private readonly data: string[];

    constructor(path: string) {
        this.data = this.readFile(path);
    }

    public readFile(path: string): string[] {
        const rawData = fs.readFileSync(path);
        const json: { data: string[] } = JSON.parse(rawData.toString());
        return json.data;
    }

    public getRandom(): string {
        const random = Math.floor(Math.random() * this.data.length);
        return this.data[random];
    }
}

export default FileManager;