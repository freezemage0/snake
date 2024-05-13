import {Direction} from "./direction";

export class Coordinate {
    public readonly x: number;
    public readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    equals(coordinate: Coordinate): boolean {
        return (
                this.x === coordinate.x &&
                this.y === coordinate.y
        );
    }

    move(direction: Direction): Coordinate {
        return new Coordinate(this.x + direction.x, this.y + direction.y);
    }
}