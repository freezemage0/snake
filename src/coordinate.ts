import {Direction} from "./direction";

export class Coordinate {
    public constructor(
            public readonly x: number,
            public readonly y: number
    ) {
    }

    public equals(coordinate: Coordinate): boolean {
        return (
                this.x === coordinate.x &&
                this.y === coordinate.y
        );
    }

    public move(direction: Direction): Coordinate {
        return new Coordinate(this.x + direction.x, this.y + direction.y);
    }
}