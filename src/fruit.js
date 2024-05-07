export class Fruit {
    constructor(context, position) {
        this.context = context;
        this.position = position;
    }

    render() {
        this.context.fillStyle = 'green';
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