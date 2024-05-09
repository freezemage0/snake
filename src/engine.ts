import {Snake} from "./snake";
import {Direction} from "./direction";
import {Fruit} from "./fruit";
import {Coordinate} from "./coordinate";
import {Colors} from "./colors";
import {Localization} from "./localization";
import {Score} from "./score";

export class Engine {
    private fruit: Fruit|null = null;
    private readonly context: CanvasRenderingContext2D;
    private readonly score: Score;
    private highScore: HTMLElement;
    private speed: number = 8;
    private localization: Localization;
    private readonly snake: Snake;
    private tickerId: number|undefined;

    private inputQueue: Array<Direction> = [];

    public constructor(
            canvas: HTMLCanvasElement,
            score: HTMLElement,
            highScore: HTMLElement,
            localization: Localization
    ) {
        const context = canvas.getContext('2d');
        if (!context) {
            throw new Error('Failed to acquire canvas context.');
        }

        this.context = context;
        this.highScore = highScore;
        this.localization = localization;

        this.snake = new Snake(this.context, Direction.right());
        this.score = new Score(score, 0);
    }

    public initialize(speed: number): void {
        window.focus();

        this.speed = speed;
        this.fruit = null;

        this.context.reset();
        this.score.reset();

        this.snake.resetSegments();
        this.snake.addSegment(this.snake.createSegment(Colors.SNAKE_HEAD));
        for (let i = 0; i < 2; i += 1) {
            this.snake.addSegment(this.snake.createSegment(Colors.SNAKE_BODY));
        }

        this.renderField();
    }

    public run() {
        window.addEventListener('keydown', this.update.bind(this));
        this.tickerId = window.setInterval(this.tick.bind(this), 1000 / this.speed);
    }

    public stop() {
        window.removeEventListener('keydown', this.update.bind(this));
        window.clearInterval(this.tickerId);
    }

    private update(event: KeyboardEvent): void {
        const currentDirection = this.inputQueue.at(-1) || this.snake.direction;

        let direction: Direction;

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

    private tick(): void {
        if (this.inputQueue.length > 0) {
            const direction = this.inputQueue.shift();
            if (direction) {
                this.snake.direction = direction;
            }
        }

        this.snake.update();

        if (this.checkCollision()) {
            const retry = confirm('Game Over. Retry?');

            const highScoreEntry = document.createElement('tr');
            const highScoreDate = document.createElement('td');
            highScoreDate.innerHTML = this.localization.formatDate(new Date());

            const highScoreValue = document.createElement('td');
            highScoreValue.innerHTML = this.score.getValue().toString();

            highScoreEntry.appendChild(highScoreDate);
            highScoreEntry.appendChild(highScoreValue);

            this.highScore.appendChild(highScoreEntry);

            if (!retry) {
                window.clearInterval(this.tickerId);
                return;
            }

            this.initialize(this.speed);
        }

        if (!this.fruit) {
            let randomPosition: Coordinate;
            do {
                randomPosition = new Coordinate(
                        Math.max(Math.round(Math.random() * 19) * 15, 15),
                        Math.max(Math.round(Math.random() * 9) * 15, 15),
                );
            } while (this.snake.segments.some((segment) => randomPosition.equals(segment.position)));

            this.fruit = new Fruit(this.context, randomPosition);
            this.fruit.render();
        }

        if (this.snake.segments.some((segment): boolean => !!this.fruit?.collidesWith(segment.position))) {
            this.snake.addSegment(this.snake.createSegment(Colors.SNAKE_BODY));
            this.score.increment();

            this.fruit = null;
        }
    }

    private checkCollision(): boolean {
        return this.snake.segments.some((segment): boolean => {
            if (segment.position.x < 0 || segment.position.x >= 300) {
                return true;
            }
            if (segment.position.y < 0 || segment.position.y >= 150) {
                return true;
            }

            return this.snake.segments.some((other): boolean => (
                segment !== other && segment.position === other.position
            ));
        });
    }

    private renderField(): void {
        this.context.beginPath();

        for (let x = 0; x <= 300; x += 15) {
            this.context.moveTo(x, 0);
            this.context.lineTo(x, 150);
            this.context.stroke();
        }

        for (let y = 0; y <= 150; y += 15) {
            this.context.moveTo(0, y);
            this.context.lineTo(300, y);
            this.context.stroke();
        }
    }
}
