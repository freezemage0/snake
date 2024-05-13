import {Coordinate} from "./coordinate";
import {Direction} from "./direction";

export class Snake {
    public segments: Array<Segment> = [];
    public lastSegment: Segment | null = null;

    public constructor(
        private readonly context: CanvasRenderingContext2D,
        public direction: Direction,
    ) {
    }

    public update(): void {
        this.segments.forEach((segment: Segment): void => {
            segment.clear();
        });

        let trail: Coordinate;
        let previousTrail: Coordinate;
        this.segments.forEach((segment: Segment): void => {
            if (!!trail) {
                trail = segment.position;
                segment.move(previousTrail);
                previousTrail = trail;
            } else {
                previousTrail = segment.position;
                segment.move(segment.position.move(this.direction));
                trail = segment.position;
            }
        });
    }

    public render(): void {
        this.segments.forEach((segment: Segment): void => {
            segment.clear();
            segment.render();
        });
    }

    public createSegment(color: string, size: number): Segment {
        let position: Coordinate;
        if (this.lastSegment) {
            position = this.lastSegment.position.move(this.direction.reverse());
        } else {
            position = new Coordinate(300 / 2, 150 / 2);
        }

        return new Segment(this.context, position, size, color);
    }

    public addSegment(segment: Segment): void {
        this.segments.push(segment);
        this.lastSegment = segment;
    }

    public resetSegments(): void {
        this.segments = [];
        this.lastSegment = null;
    }
}

class Segment {
    public constructor(
            private readonly context: CanvasRenderingContext2D,
            public position: Coordinate,
            private readonly size: number,
            private readonly color: string
    ) {
    }

    public move(position: Coordinate): void {
        this.position = position;
    }

    public clear(): void {
        this.context.fillStyle = 'white';
        this.context.fillRect(
                this.position.x + 1,
                this.position.y + 1,
                this.size,
                this.size
        );
    }

    public render(): void {
        this.context.fillStyle = this.color;
        this.context.fillRect(
                this.position.x + 1,
                this.position.y + 1,
                this.size,
                this.size
        );
    }
}
