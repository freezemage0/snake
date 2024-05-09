import {Coordinate} from "./coordinate";
import {Colors} from "./colors";

export class Fruit {
    private context: CanvasRenderingContext2D;
    private position: Coordinate;

    constructor(context: CanvasRenderingContext2D, position: Coordinate) {
        this.context = context;
        this.position = position;
    }

    render() {
        this.context.fillStyle = Colors.FRUIT;
        this.context.fillRect(
                this.position.x + 1,
                this.position.y + 1,
                13,
                13
        );
    }

    clear() {
        this.context.fillStyle = 'white';
        this.context.fillRect(
                this.position.x + 1,
                this.position.y + 1,
                13,
                13
        );
    }

    collidesWith(position: Coordinate): boolean {
        return this.position.equals(position);
    }
}
