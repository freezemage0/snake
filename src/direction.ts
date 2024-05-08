export class Direction {
    private static cache: Map<number, Direction>;

    public readonly x: number;
    public readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static right(): Direction {
        if (!Direction.cache.has(DirectionTypes.RIGHT)) {
            Direction.cache.set(DirectionTypes.RIGHT, new Direction(15, 0));
        }

        return Direction.cache.get(DirectionTypes.RIGHT);
    }

    public static left(): Direction {
        if (!Direction.cache.has(DirectionTypes.LEFT)) {
            Direction.cache.set(DirectionTypes.LEFT, new Direction(-15, 0));
        }

        return Direction.cache.get(DirectionTypes.LEFT);
    }

    public static up(): Direction {
        if (!Direction.cache.has(DirectionTypes.UP)) {
            Direction.cache.set(DirectionTypes.UP, new Direction(0, -15));
        }

        return Direction.cache.get(DirectionTypes.UP);
    }

    public static down(): Direction {
        if (!Direction.cache.has(DirectionTypes.DOWN)) {
            Direction.cache.set(DirectionTypes.DOWN, new Direction(0, 15));
        }

        return Direction.cache.get(DirectionTypes.DOWN);
    }

    public reverse() {
        return new Direction(this.x * -1, this.y * -1);
    }

    public equals(direction: Direction) {
        return this.x === direction.x && this.y === direction.y;
    }

    public isReverse(direction: Direction) {
        return direction.equals(this.reverse());
    }
}

class DirectionTypes {
    public static UP: number = 0;
    public static DOWN: number = 1;
    public static LEFT: number = 2;
    public static RIGHT: number = 3;
}