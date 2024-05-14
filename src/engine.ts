import {Snake} from "./snake";
import {Direction} from "./direction";
import {Fruit} from "./fruit";
import {Coordinate} from "./coordinate";
import {Localization} from "./localization";
import {Score} from "./score";
import {Settings} from "./settings";
import {History} from './history';

export class Engine {
    private fruit: Fruit|null = null;
    private readonly context: CanvasRenderingContext2D;
    private readonly score: Score;
    private readonly snake: Snake;
    private inputQueue: Array<Direction> = [];
    private running: boolean = false;

    public constructor(
            canvas: HTMLCanvasElement,
            score: HTMLElement,
            private readonly localization: Localization,
            private settings: Settings,
            private readonly history: History
    ) {
        const context = canvas.getContext('2d');
        if (!context) {
            throw new Error('Failed to acquire canvas context.');
        }
        this.context = context;

        this.snake = new Snake(this.context, Direction.right());
        this.score = new Score(score, 0);
    }

    public initialize(settings: Settings): void {
        window.focus();

        this.settings = settings;

        this.fruit = null;
        this.context.reset();
        this.score.reset();

        this.snake.direction = Direction.right();
        this.snake.resetSegments();

        this.snake.addSegment(this.snake.createSegment(this.settings.colors.head, 26));
        for (let i: number = 0; i < 2; i += 1) {
            this.snake.addSegment(this.snake.createSegment(this.settings.colors.body, 26));
        }

        this.renderField();
    }

    public run(): void {
        if (this.running) {
            return;
        }

        this.running = true;

        window.addEventListener('keydown', this.update.bind(this));
        window.requestAnimationFrame(this.updateController.bind(this));
        window.requestAnimationFrame(window.setTimeout.bind(window, this.tick.bind(this), 1000 / this.settings.speed));
    }

    public stop(): void {
        this.running = false;

        window.removeEventListener('keydown', this.update.bind(this));
    }

    private update(event: KeyboardEvent): void {
        const currentDirection: Direction = this.inputQueue.at(-1) || this.snake.direction;

        const direction: Direction | null = KeyboardControlMap.getDirection(event.code);
        if (!direction) {
            return;
        }

        if (direction.equals(currentDirection) || direction.isReverse(currentDirection)) {
            return;
        }

        this.inputQueue.push(direction);
    }

    private tick(): void {
        if (!this.running) {
            return;
        }

        if (this.inputQueue.length > 0) {
            const direction = this.inputQueue.shift();
            if (direction) {
                this.snake.direction = direction;
            }
        }

        this.snake.update();

        if (this.checkCollision()) {
            this.finalizeSession(this.localization.getMessage('GAME_OVER'));
            this.snake.render();

            return;
        }

        if (this.snake.segments.length == 200) {
            this.finalizeSession(this.localization.getMessage('VICTORY'));
            this.snake.render();

            return;
        }

        this.snake.render();

        if (!this.fruit) {
            let randomPosition: Coordinate;
            do {
                randomPosition = new Coordinate(
                        Math.max(Math.round(Math.random() * 19) * 30, 30),
                        Math.max(Math.round(Math.random() * 9) * 30, 30),
                );
            } while (this.snake.segments.some((segment) => randomPosition.equals(segment.position)));

            this.fruit = new Fruit(this.context, randomPosition, this.settings.colors.fruit);
            this.fruit.render();
        }

        if (this.snake.segments.some((segment): boolean => !!this.fruit?.collidesWith(segment.position))) {
            this.snake.addSegment(this.snake.createSegment(this.settings.colors.body, 26));
            this.score.increment();

            this.fruit = null;
        }

        window.requestAnimationFrame(window.setTimeout.bind(window, this.tick.bind(this), 1000 / this.settings.speed));
    }

    private checkCollision(): boolean {
        return this.snake.segments.some((segment): boolean => {
            if (segment.position.x < Boundary.LOWEST_HORIZONTAL || segment.position.x >= Boundary.HIGHEST_HORIZONTAL) {
                return true;
            }
            if (segment.position.y < Boundary.LOWEST_VERTICAL || segment.position.y >= Boundary.HIGHEST_VERTICAL) {
                return true;
            }

            return this.snake.segments.some((other): boolean => (
                segment !== other &&
                segment.position.equals(other.position)
            ));
        });
    }

    private renderField(): void {
        this.context.strokeStyle = this.settings.colors.border;

        this.context.beginPath();

        for (let x: number = Boundary.LOWEST_HORIZONTAL; x <= Boundary.HIGHEST_HORIZONTAL; x += 30) {
            this.context.moveTo(x, Boundary.LOWEST_VERTICAL);
            this.context.lineTo(x, Boundary.HIGHEST_VERTICAL);
            this.context.stroke();
        }

        for (let y: number = Boundary.LOWEST_VERTICAL; y <= Boundary.HIGHEST_VERTICAL; y += 30) {
            this.context.moveTo(Boundary.LOWEST_HORIZONTAL, y);
            this.context.lineTo(Boundary.HIGHEST_HORIZONTAL, y);
            this.context.stroke();
        }
    }

    private finalizeSession(message: string): void {
        this.stop();

        const retry = confirm(message);

        this.history.register(new Date(), this.score.getValue());

        if (!retry) {
            return;
        }

        this.initialize(this.settings);
        this.run();
    }

    private updateController(): void {
        if (!this.running) {
            return;
        }

        window.requestAnimationFrame(this.updateController.bind(this));

        const controller = navigator.getGamepads().find((gamepad) => !!gamepad);
        if (!controller) {
            return;
        }

        let currentDirection: Direction = this.inputQueue.at(-1) || this.snake.direction;
        let direction: Direction | undefined;

        const [horizontalAxis, verticalAxis] = controller.axes.map(Math.round);
        if (horizontalAxis === 1) {
            direction = Direction.right();
        }
        if (horizontalAxis === -1) {
            direction = Direction.left();
        }
        if (verticalAxis === 1) {
            direction = Direction.down();
        }
        if (verticalAxis === -1) {
            direction = Direction.up();
        }

        if (!direction) {
            const index: number = controller.buttons.findIndex((button) => button.pressed);

            const controllerMap = new Map([
                [12, Direction.up()],
                [13, Direction.down()],
                [14, Direction.left()],
                [15, Direction.right()],
            ]);

            if (!controllerMap.has(index)) {
                return;
            }

            direction = controllerMap.get(index);
        }

        if (!direction) {
            return;
        }

        if (direction.equals(currentDirection) || direction.isReverse(currentDirection)) {
            return;
        }

        this.inputQueue.push(direction);
    }
}

enum Boundary {
    LOWEST_VERTICAL = 0,
    LOWEST_HORIZONTAL = 0,
    HIGHEST_VERTICAL = 300,
    HIGHEST_HORIZONTAL = 600
}

class KeyboardControlMap {
    private static readonly map: Map<Array<string>, Direction> = new Map(
        [
            [['KeyW', 'ArrowUp'], Direction.up()],
            [['KeyA', 'ArrowLeft'], Direction.left()],
            [['KeyD', 'ArrowRight'], Direction.right()],
            [['KeyS', 'ArrowDown'], Direction.down()]
        ]
    );

    public static getDirection(keyCode: string): Direction|null {
        const key = Array
                .from(KeyboardControlMap.map.keys())
                .find((keyCodes: Array<string>): boolean => keyCodes.includes(keyCode));

        if (!key) {
            return null;
        }

        return KeyboardControlMap.map.get(key) || null;
    }
}
