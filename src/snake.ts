import {Coordinate} from "./coordinate.js";
import {Direction} from "./direction";
import {Colors} from "./colors";

export class Snake {
    public direction: Direction;
    private readonly context: CanvasRenderingContext2D;
    public segments: Array<Segment>
    public lastSegment: Segment | null;

    constructor(context: CanvasRenderingContext2D, direction: Direction) {
        this.context = context;
        this.direction = direction;
        this.segments = [];
    }

    update(): void {
        this.segments.forEach((segment) => {
            segment.clear();
        });

        let trail: Coordinate = null;
        let previousTrail: Coordinate = null;
        this.segments.forEach((segment) => {
            if (trail !== null) {
                trail = segment.position;
                segment.move(previousTrail);
                previousTrail = trail;
            } else {
                previousTrail = segment.position;
                segment.move(segment.position.move(this.direction));
                trail = segment.position;
            }

            segment.render();
        });
    }

    createSegment(color: string): Segment {
        let position: Coordinate;
        if (this.lastSegment) {
            position = this.lastSegment.position.move(this.direction.reverse());
        } else {
            position = new Coordinate(300 / 2, 150 / 2);
        }

        return new Segment(this.context, position, 13, color || Colors.SNAKE_BODY);
    }

    addSegment(segment: Segment) {
        this.segments.push(segment);
        this.lastSegment = segment;
    }
}

class Segment {
    private context: CanvasRenderingContext2D;
    public position: Coordinate;
    private readonly size: number;
    private readonly color: string;

    constructor(
            context: CanvasRenderingContext2D,
            position: Coordinate,
            size: number,
            color: string
    ) {
        this.context = context;
        this.position = position;
        this.size = size;
        this.color = color;
    }

    move(position: Coordinate): void {
        this.position = position;
    }

    clear(): void {
        this.context.fillStyle = 'white';
        this.context.fillRect(
                this.position.x + 1,
                this.position.y + 1,
                this.size,
                this.size
        );
    }

    render(): void {
        this.context.fillStyle = this.color;
        this.context.fillRect(
                this.position.x + 1,
                this.position.y + 1,
                this.size,
                this.size
        );
    }
}