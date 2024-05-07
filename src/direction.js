export class Direction {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static right() {
        return new Direction(15, 0);
    }

    static left() {
        return new Direction(-15, 0);
    }

    static up() {
        return new Direction(0, -15);
    }

    static down() {
        return new Direction(0, 15);
    }

    reverse() {
        return new Direction(this.x * -1, this.y * -1);
    }

    equals(direction) {
        return this.x === direction.x && this.y === direction.y;
    }

    isReverse(direction) {
        return (
                ((this.x !== 0 && direction.x !== 0) && this.y + direction.y === 0) ||
                ((this.y !== 0 && direction.y !== 0) && this.x + direction.x === 0)
        );
    }
}