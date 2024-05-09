export class Direction {
    private static cache: Map<string, Direction> = new Map();
    private static reverseMap: Map<string, Function>;

    public readonly type: string;
    public readonly x: number;
    public readonly y: number;

    private constructor(type: string, x: number, y: number) {
        this.type = type;
        this.x = x;
        this.y = y;

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

        return new Direction(DirectionType.RIGHT, 15, 0);
    }

    public static left(): Direction {
        if (Direction.cache.has(DirectionType.LEFT)) {
            return Direction.get(DirectionType.LEFT);
        }

        return new Direction(DirectionType.LEFT, -15, 0);
    }

    public static up(): Direction {
        if (Direction.cache.has(DirectionType.UP)) {
            return Direction.get(DirectionType.UP);
        }

        return new Direction(DirectionType.UP, 0, -15);
    }

    public static down(): Direction {
        if (Direction.cache.has(DirectionType.DOWN)) {
            return Direction.get(DirectionType.DOWN);
        }

        return new Direction(DirectionType.DOWN, 0, 15);
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

export class DirectionType {
    public static readonly LEFT: string = 'left';
    public static readonly RIGHT: string = 'right';
    public static readonly UP: string = 'up';
    public static readonly DOWN: string = 'down';

    public static isType(value: string): boolean {
        return Object.values(DirectionType).some((type) => type === value);
    }
}
