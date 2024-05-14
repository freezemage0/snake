import {Coordinate} from "./coordinate";

export class Fruit {
    constructor(
        private context: CanvasRenderingContext2D,
        private position: Coordinate,
        private color: string
    ) {
    }

    public render(): void {
        this.context.fillStyle = this.color;
        this.context.fillRect(
                this.position.x + 2,
                this.position.y + 2,
                26,
                26
        );
    }
    public collidesWith(position: Coordinate): boolean {
        return this.position.equals(position);
    }
}
