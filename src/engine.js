import {Snake} from "./snake.js";
import {Direction} from "./direction.js";
import {Fruit} from "./fruit.js";
import {Coordinate} from "./coordinate.js";

export class Engine {
    fruit = null;
    inputQueue = [];

    constructor(canvas, score, highScore, speed) {
        this.canvas = canvas;
        this.score = score;
        this.highScore = highScore;
        this.speed = speed || 8;
    }

    initialize() {
        window.focus();

        this.scoreValue = 0;
        this.updateScore();
        this.fruit = null;

        const context = this.canvas.getContext('2d');
        context.reset();

        this.context = context;
        this.renderField(context);

        this.snake = new Snake(context, Direction.right());
        for (let i = 0; i < 3; i += 1) {
            this.snake.addSegment(this.snake.createSegment());
        }
    }

    run() {
        window.addEventListener('keydown', this.update.bind(this));
        this.tickerId = setInterval(this.tick.bind(this), 1000 / this.speed);
    }

    update(event) {
        const currentDirection = this.inputQueue.at(-1) || this.snake.direction;

        let direction;

        switch (event.key.toLowerCase()) {
            case 'w':
            case 'ц':
                direction = Direction.up();
                break;
            case 'a':
            case 'ф':
                direction = Direction.left();
                break;
            case 's':
            case 'ы':
                direction = Direction.down();
                break;
            case 'd':
            case 'в':
                direction = Direction.right();
                break;
            default:
                return;
        }

        if (direction.equals(currentDirection) || direction.isReverse(currentDirection)) {
            return;
        }

        this.inputQueue.push(direction);
    }

    tick() {
        if (this.inputQueue.length > 0) {
            this.snake.direction = this.inputQueue.shift();
        }

        this.snake.update();

        if (this.checkCollision()) {
            const retry = confirm('Game Over. Retry?');

            const highScoreEntry = document.createElement('div');
            highScoreEntry.classList.add('high-score__entry');
            highScoreEntry.innerHTML = (new Date()).toLocaleString() + ': ' + this.scoreValue;

            this.highScore.appendChild(highScoreEntry);

            if (!retry) {
                clearInterval(this.tickerId);
                return;
            }

            this.initialize();
        }

        if (!this.fruit) {
            let randomPosition;
            do {
                 randomPosition = new Coordinate(
                        Math.max(Math.round(Math.random() * 19) * 15, 15),
                        Math.max(Math.round(Math.random() * 9) * 15, 15),
                );
            } while (this.snake.segments.some((segment) => randomPosition.equals(segment.position)));

            this.fruit = new Fruit(this.context, randomPosition);
            this.fruit.render();
        }

        if (this.snake.segments.some((segment) => this.fruit.collidesWith(segment.position))) {
            this.snake.addSegment(this.snake.createSegment());
            this.scoreValue += 1;
            this.updateScore();
            this.fruit = null;
        }
    }

    checkCollision() {
        return this.snake.segments.some((segment) => {
            if (segment.position.x < 0 || segment.position.x >= 300) {
                return true;
            }
            if (segment.position.y < 0 || segment.position.y >= 150) {
                return true;
            }

            return this.snake.segments.some((other) => {
                return (
                        segment !== other &&
                        segment.position.x === other.position.x &&
                        segment.position.y === other.position.y
                );
            });
        })
    }

    renderField(context) {
        context.beginPath();

        for (let x = 0; x <= 300; x += 15) {
            context.moveTo(x, 0);
            context.lineTo(x, 150);
            context.stroke();
        }

        for (let y = 0; y <= 150; y += 15) {
            context.moveTo(0, y);
            context.lineTo(300, y);
            context.stroke();
        }
    }

    updateScore() {
        this.score.innerHTML = this.scoreValue;
    }
}