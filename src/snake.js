import {Coordinate} from "./coordinate.js";

export class Snake {
    lastSegment;

    constructor(context, direction) {
        this.context = context;
        this.direction = direction;
        this.segments = [];
    }

    update() {
        this.segments.forEach((segment) => {
            segment.clear();
        });

        let trail = null;
        let previousTrail = null;
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

    createSegment(color) {
        let position;
        if (this.lastSegment) {
            position = this.lastSegment.position.move(this.direction.reverse());
        } else {
            position = new Coordinate(300/2, 150/2);
        }

        return new Segment(this.context, position, 13, color || 'orange');
    }

    addSegment(segment) {
        this.segments.push(segment);
        this.lastSegment = segment;
    }
}

class Segment {
    constructor(context, position, size, color) {
        this.context = context;
        this.position = position;
        this.size = size;
        this.color = color;
    }

    move(position) {
        this.position = position;
    }

    clear() {
        this.context.fillStyle = 'white';
        this.context.fillRect(
                this.position.x + 1,
                this.position.y + 1,
                this.size,
                this.size
        );
    }

    render() {
        this.context.fillStyle = this.color;
        this.context.fillRect(
                this.position.x + 1,
                this.position.y + 1,
                this.size,
                this.size
        );
    }
}