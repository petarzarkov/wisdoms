export class Stopwatch {
    private startTime: number;
    public constructor() {
        this.startTime = Date.now();
    }

    public getElapsed(): number {
        return Date.now() - this.startTime;
    }
}
