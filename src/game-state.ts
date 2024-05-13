export interface GameState {
    render(): void;

    update(): void;
}

export interface GameContext {
    setState(state: GameState): void;

    getCanvasContext(): CanvasRenderingContext2D;
}

export class Idle implements GameState {
    public constructor(private readonly gameContext: GameContext) {
    }

    public render(): void {
        const canvasContext = this.gameContext.getCanvasContext();
        canvasContext.beginPath();

        canvasContext.moveTo(0, 0);
        canvasContext.lineTo(0, 150);
        canvasContext.lineTo(300, 150);
        canvasContext.lineTo(300, 0);
        canvasContext.lineTo(0, 0);
        canvasContext.stroke();
    }

    public update(): void {
    }
}

export class Running implements GameState {
    public render(): void {

    }

    public update(): void {
    }
}

export class Finish implements GameState {
    public render(): void {

    }

    public update(): void {
    }
}