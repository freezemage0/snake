(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Freezemage: () => (/* binding */ Freezemage)
});

;// CONCATENATED MODULE: ./src/coordinate.ts
var Coordinate = /** @class */ (function () {
    function Coordinate(x, y) {
        this.x = x;
        this.y = y;
    }
    Coordinate.prototype.equals = function (coordinate) {
        return (this.x === coordinate.x &&
            this.y === coordinate.y);
    };
    Coordinate.prototype.move = function (direction) {
        return new Coordinate(this.x + direction.x, this.y + direction.y);
    };
    return Coordinate;
}());


;// CONCATENATED MODULE: ./src/colors.ts
var Colors = Object.freeze({
    SNAKE_HEAD: 'red',
    SNAKE_BODY: 'orange',
    FRUIT: 'green'
});

;// CONCATENATED MODULE: ./src/snake.ts


var Snake = /** @class */ (function () {
    function Snake(context, direction) {
        this.segments = [];
        this.lastSegment = null;
        this.context = context;
        this.direction = direction;
    }
    Snake.prototype.update = function () {
        var _this = this;
        this.segments.forEach(function (segment) {
            segment.clear();
        });
        var trail;
        var previousTrail;
        this.segments.forEach(function (segment) {
            if (!!trail) {
                trail = segment.position;
                segment.move(previousTrail);
                previousTrail = trail;
            }
            else {
                previousTrail = segment.position;
                segment.move(segment.position.move(_this.direction));
                trail = segment.position;
            }
            segment.render();
        });
    };
    Snake.prototype.createSegment = function (color) {
        var position;
        if (this.lastSegment) {
            position = this.lastSegment.position.move(this.direction.reverse());
        }
        else {
            position = new Coordinate(300 / 2, 150 / 2);
        }
        return new Segment(this.context, position, 13, color || Colors.SNAKE_BODY);
    };
    Snake.prototype.addSegment = function (segment) {
        this.segments.push(segment);
        this.lastSegment = segment;
    };
    Snake.prototype.resetSegments = function () {
        this.segments = [];
        this.lastSegment = null;
    };
    return Snake;
}());

var Segment = /** @class */ (function () {
    function Segment(context, position, size, color) {
        this.context = context;
        this.position = position;
        this.size = size;
        this.color = color;
    }
    Segment.prototype.move = function (position) {
        this.position = position;
    };
    Segment.prototype.clear = function () {
        this.context.fillStyle = 'white';
        this.context.fillRect(this.position.x + 1, this.position.y + 1, this.size, this.size);
    };
    Segment.prototype.render = function () {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.position.x + 1, this.position.y + 1, this.size, this.size);
    };
    return Segment;
}());

;// CONCATENATED MODULE: ./src/direction.ts
var Direction = /** @class */ (function () {
    function Direction(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;
        Direction.cache.set(type, this);
    }
    Direction.get = function (type) {
        var direction = Direction.cache.get(type);
        if (!direction) {
            throw new TypeError('Unknown direction type.');
        }
        return direction;
    };
    Direction.right = function () {
        if (Direction.cache.has(DirectionType.RIGHT)) {
            return Direction.get(DirectionType.RIGHT);
        }
        return new Direction(DirectionType.RIGHT, 15, 0);
    };
    Direction.left = function () {
        if (Direction.cache.has(DirectionType.LEFT)) {
            return Direction.get(DirectionType.LEFT);
        }
        return new Direction(DirectionType.LEFT, -15, 0);
    };
    Direction.up = function () {
        if (Direction.cache.has(DirectionType.UP)) {
            return Direction.get(DirectionType.UP);
        }
        return new Direction(DirectionType.UP, 0, -15);
    };
    Direction.down = function () {
        if (Direction.cache.has(DirectionType.DOWN)) {
            return Direction.get(DirectionType.DOWN);
        }
        return new Direction(DirectionType.DOWN, 0, 15);
    };
    Direction.prototype.reverse = function () {
        if (!Direction.reverseMap) {
            Direction.reverseMap = new Map([
                [DirectionType.LEFT, Direction.right],
                [DirectionType.RIGHT, Direction.left],
                [DirectionType.UP, Direction.down],
                [DirectionType.DOWN, Direction.up],
            ]);
        }
        var reverseDirection = Direction.reverseMap.get(this.type);
        if (!reverseDirection) {
            throw new Error('Direction has no reverse (?)');
        }
        return reverseDirection.call(Direction);
    };
    Direction.prototype.equals = function (direction) {
        return this === direction;
    };
    Direction.prototype.isReverse = function (direction) {
        return this.reverse() === direction;
    };
    Direction.cache = new Map();
    return Direction;
}());

var DirectionType = /** @class */ (function () {
    function DirectionType() {
    }
    DirectionType.isType = function (value) {
        return Object.values(DirectionType).some(function (type) { return type === value; });
    };
    DirectionType.LEFT = 'left';
    DirectionType.RIGHT = 'right';
    DirectionType.UP = 'up';
    DirectionType.DOWN = 'down';
    return DirectionType;
}());


;// CONCATENATED MODULE: ./src/fruit.ts

var Fruit = /** @class */ (function () {
    function Fruit(context, position) {
        this.context = context;
        this.position = position;
    }
    Fruit.prototype.render = function () {
        this.context.fillStyle = Colors.FRUIT;
        this.context.fillRect(this.position.x + 1, this.position.y + 1, 13, 13);
    };
    Fruit.prototype.clear = function () {
        this.context.fillStyle = 'white';
        this.context.fillRect(this.position.x + 1, this.position.y + 1, 13, 13);
    };
    Fruit.prototype.collidesWith = function (position) {
        return this.position.equals(position);
    };
    return Fruit;
}());


;// CONCATENATED MODULE: ./src/score.ts
var Score = /** @class */ (function () {
    function Score(node, value) {
        this.node = node;
        this.value = value;
    }
    Score.prototype.increment = function () {
        this.value += 1;
        this.update();
    };
    Score.prototype.getValue = function () {
        return this.value;
    };
    Score.prototype.update = function () {
        this.node.innerHTML = this.value.toString();
    };
    Score.prototype.reset = function () {
        this.value = 0;
        this.update();
    };
    return Score;
}());


;// CONCATENATED MODULE: ./src/engine.ts






var Engine = /** @class */ (function () {
    function Engine(canvas, score, highScore, localization) {
        this.fruit = null;
        this.speed = 8;
        this.inputQueue = [];
        var context = canvas.getContext('2d');
        if (!context) {
            throw new Error('Failed to acquire canvas context.');
        }
        this.context = context;
        this.highScore = highScore;
        this.localization = localization;
        this.snake = new Snake(this.context, Direction.right());
        this.score = new Score(score, 0);
    }
    Engine.prototype.initialize = function (speed) {
        window.focus();
        this.speed = speed;
        this.fruit = null;
        this.context.reset();
        this.score.reset();
        this.snake.resetSegments();
        this.snake.addSegment(this.snake.createSegment(Colors.SNAKE_HEAD));
        for (var i = 0; i < 2; i += 1) {
            this.snake.addSegment(this.snake.createSegment(Colors.SNAKE_BODY));
        }
        this.renderField();
    };
    Engine.prototype.run = function () {
        window.addEventListener('keydown', this.update.bind(this));
        this.tickerId = window.setInterval(this.tick.bind(this), 1000 / this.speed);
    };
    Engine.prototype.stop = function () {
        window.removeEventListener('keydown', this.update.bind(this));
        window.clearInterval(this.tickerId);
    };
    Engine.prototype.update = function (event) {
        var currentDirection = this.inputQueue.at(-1) || this.snake.direction;
        var direction;
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
    };
    Engine.prototype.tick = function () {
        var _this = this;
        if (this.inputQueue.length > 0) {
            var direction = this.inputQueue.shift();
            if (direction) {
                this.snake.direction = direction;
            }
        }
        this.snake.update();
        if (this.checkCollision()) {
            var retry = confirm('Game Over. Retry?');
            var highScoreEntry = document.createElement('tr');
            var highScoreDate = document.createElement('td');
            highScoreDate.innerHTML = this.localization.formatDate(new Date());
            var highScoreValue = document.createElement('td');
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
            var randomPosition_1;
            do {
                randomPosition_1 = new Coordinate(Math.max(Math.round(Math.random() * 19) * 15, 15), Math.max(Math.round(Math.random() * 9) * 15, 15));
            } while (this.snake.segments.some(function (segment) { return randomPosition_1.equals(segment.position); }));
            this.fruit = new Fruit(this.context, randomPosition_1);
            this.fruit.render();
        }
        if (this.snake.segments.some(function (segment) { var _a; return !!((_a = _this.fruit) === null || _a === void 0 ? void 0 : _a.collidesWith(segment.position)); })) {
            this.snake.addSegment(this.snake.createSegment(Colors.SNAKE_BODY));
            this.score.increment();
            this.fruit = null;
        }
    };
    Engine.prototype.checkCollision = function () {
        var _this = this;
        return this.snake.segments.some(function (segment) {
            if (segment.position.x < 0 || segment.position.x >= 300) {
                return true;
            }
            if (segment.position.y < 0 || segment.position.y >= 150) {
                return true;
            }
            return _this.snake.segments.some(function (other) { return (segment !== other && segment.position === other.position); });
        });
    };
    Engine.prototype.renderField = function () {
        this.context.beginPath();
        for (var x = 0; x <= 300; x += 15) {
            this.context.moveTo(x, 0);
            this.context.lineTo(x, 150);
            this.context.stroke();
        }
        for (var y = 0; y <= 150; y += 15) {
            this.context.moveTo(0, y);
            this.context.lineTo(300, y);
            this.context.stroke();
        }
    };
    return Engine;
}());


;// CONCATENATED MODULE: ./src/localization.ts
var Localization = /** @class */ (function () {
    function Localization(dictionary) {
        this.locale = new Intl.Locale(navigator.language);
        this.dateFormatter = new Intl.DateTimeFormat(this.locale.maximize().language, {
            dateStyle: 'medium',
            timeStyle: 'medium',
        });
        this.dictionary = dictionary;
    }
    Localization.prototype.getMessage = function (code) {
        var info = this.locale.maximize();
        if (!this.dictionary.has(info.language)) {
            return code;
        }
        var locales = this.dictionary.get(info.language);
        if (!locales || !locales.has(code)) {
            return code;
        }
        return locales.get(code);
    };
    Localization.prototype.formatDate = function (date) {
        return this.dateFormatter.format(date);
    };
    return Localization;
}());

var Messages = new Map([
    ['en', new Map([
            ['SCORE', 'Score'],
            ['SPEED', 'Speed'],
            ['ATTEMPTS', 'Attempts'],
            ['SETTINGS', 'Settings'],
            ['START', 'Start'],
            ['DATE', 'Date'],
        ])],
    ['ru', new Map([
            ['SCORE', 'Очки'],
            ['SPEED', 'Скорость'],
            ['ATTEMPTS', 'Попытки'],
            ['SETTINGS', 'Настройки'],
            ['START', 'Начать'],
            ['DATE', 'Дата'],
        ])]
]);

;// CONCATENATED MODULE: ./src/index.ts


var Freezemage = {
    Engine: Engine,
    Localization: Localization,
    Messages: Messages
};

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map