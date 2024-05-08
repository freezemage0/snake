export class Fruit {
    constructor(context, position, color) {
        this.context = context;
        this.position = position;
        this.color = color;
    }

    render() {
        this.context.fillStyle = this.color;
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

    collidesWith(position) {
        return this.position.equals(position);
    }
}