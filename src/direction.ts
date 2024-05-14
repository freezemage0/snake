export class Direction {
    private static cache: Map<string, Direction> = new Map();
    private static reverseMap: Map<string, Function>;

    private constructor(
        public readonly type: string,
        public readonly x: number,
        public readonly y: number
    ) {
        Direction.cache.set(type, this);
    }

    public static get(type: string): Direction {
        const direction = Direction.cache.get(type);
        if (!direction) {
            throw new TypeError('Unknown direction type.');
        }
        return direction;
    }

    public static right(): Direction {
        if (Direction.cache.has(DirectionType.RIGHT)) {
            return Direction.get(DirectionType.RIGHT);
        }

        return new Direction(DirectionType.RIGHT, 30, 0);
    }

    public static left(): Direction {
        if (Direction.cache.has(DirectionType.LEFT)) {
            return Direction.get(DirectionType.LEFT);
        }

        return new Direction(DirectionType.LEFT, -30, 0);
    }

    public static up(): Direction {
        if (Direction.cache.has(DirectionType.UP)) {
            return Direction.get(DirectionType.UP);
        }

        return new Direction(DirectionType.UP, 0, -30);
    }

    public static down(): Direction {
        if (Direction.cache.has(DirectionType.DOWN)) {
            return Direction.get(DirectionType.DOWN);
        }

        return new Direction(DirectionType.DOWN, 0, 30);
    }

    public reverse(): Direction {
        if (!Direction.reverseMap) {
            Direction.reverseMap = new Map([
                [DirectionType.LEFT, Direction.right],
                [DirectionType.RIGHT, Direction.left],
                [DirectionType.UP, Direction.down],
                [DirectionType.DOWN, Direction.up],
            ]);
        }

        const reverseDirection = Direction.reverseMap.get(this.type);
        if (!reverseDirection) {
            throw new Error('Direction has no reverse (?)');
        }
        return reverseDirection.call(Direction);
    }

    public equals(direction: Direction): boolean {
        return this === direction;
    }

    public isReverse(direction: Direction) {
        return this.reverse() === direction;
    }
}

enum DirectionType {
    LEFT = 'left',
    RIGHT = 'right',
    UP = 'up',
    DOWN = 'down',
}
