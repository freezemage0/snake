export class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    equals(coordinate) {
        return (
                this.x === coordinate.x &&
                this.y === coordinate.y
        );
    }

    move(direction) {
        return new Coordinate(
                this.x + direction.x,
                this.y + direction.y
        );
    }
}