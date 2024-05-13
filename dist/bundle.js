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
/******/ 	var __webpack_modules__ = ({});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
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


;// CONCATENATED MODULE: ./src/snake.ts

var Snake = /** @class */ (function () {
    function Snake(context, direction) {
        this.context = context;
        this.direction = direction;
        this.segments = [];
        this.lastSegment = null;
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
        });
    };
    Snake.prototype.render = function () {
        this.segments.forEach(function (segment) {
            segment.clear();
            segment.render();
        });
    };
    Snake.prototype.createSegment = function (color, size) {
        var position;
        if (this.lastSegment) {
            position = this.lastSegment.position.move(this.direction.reverse());
        }
        else {
            position = new Coordinate(300 / 2, 150 / 2);
        }
        return new Segment(this.context, position, size, color);
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

var DirectionType;
(function (DirectionType) {
    DirectionType["LEFT"] = "left";
    DirectionType["RIGHT"] = "right";
    DirectionType["UP"] = "up";
    DirectionType["DOWN"] = "down";
})(DirectionType || (DirectionType = {}));

;// CONCATENATED MODULE: ./src/fruit.ts
var Fruit = /** @class */ (function () {
    function Fruit(context, position, color) {
        this.context = context;
        this.position = position;
        this.color = color;
    }
    Fruit.prototype.render = function () {
        this.context.fillStyle = this.color;
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


;// CONCATENATED MODULE: ./src/game-state.ts
var Idle = /** @class */ (function () {
    function Idle(gameContext) {
        this.gameContext = gameContext;
    }
    Idle.prototype.render = function () {
        var canvasContext = this.gameContext.getCanvasContext();
        canvasContext.beginPath();
        canvasContext.moveTo(0, 0);
        canvasContext.lineTo(0, 150);
        canvasContext.lineTo(300, 150);
        canvasContext.lineTo(300, 0);
        canvasContext.lineTo(0, 0);
        canvasContext.stroke();
    };
    Idle.prototype.update = function () {
    };
    return Idle;
}());

var Running = /** @class */ (function () {
    function Running() {
    }
    Running.prototype.render = function () {
    };
    Running.prototype.update = function () {
    };
    return Running;
}());

var Finish = /** @class */ (function () {
    function Finish() {
    }
    Finish.prototype.render = function () {
    };
    Finish.prototype.update = function () {
    };
    return Finish;
}());


;// CONCATENATED MODULE: ./src/engine.ts






var Engine = /** @class */ (function () {
    function Engine(canvas, score, localization, settings, history) {
        this.localization = localization;
        this.settings = settings;
        this.history = history;
        this.fruit = null;
        this.inputQueue = [];
        this.running = false;
        var context = canvas.getContext('2d');
        if (!context) {
            throw new Error('Failed to acquire canvas context.');
        }
        this.context = context;
        this.snake = new Snake(this.context, Direction.right());
        this.score = new Score(score, 0);
        this.state = new Idle(this);
    }
    Engine.prototype.initialize = function (settings) {
        window.focus();
        this.settings = settings;
        this.fruit = null;
        this.context.reset();
        this.score.reset();
        this.snake.direction = Direction.right();
        this.snake.resetSegments();
        this.snake.addSegment(this.snake.createSegment(this.settings.colors.head, 13));
        for (var i = 0; i < 2; i += 1) {
            this.snake.addSegment(this.snake.createSegment(this.settings.colors.body, 13));
        }
        this.renderField();
    };
    Engine.prototype.run = function () {
        this.running = true;
        window.addEventListener('keydown', this.update.bind(this));
        window.requestAnimationFrame(this.updateController.bind(this));
        window.requestAnimationFrame(window.setTimeout.bind(window, this.tick.bind(this), 1000 / this.settings.speed));
    };
    Engine.prototype.stop = function () {
        this.running = false;
        window.removeEventListener('keydown', this.update.bind(this));
    };
    Engine.prototype.update = function (event) {
        var currentDirection = this.inputQueue.at(-1) || this.snake.direction;
        var direction = KeyboardControlMap.getDirection(event.code);
        if (!direction) {
            return;
        }
        if (direction.equals(currentDirection) || direction.isReverse(currentDirection)) {
            return;
        }
        this.inputQueue.push(direction);
    };
    Engine.prototype.tick = function () {
        var _this = this;
        if (!this.running) {
            return;
        }
        if (this.inputQueue.length > 0) {
            var direction = this.inputQueue.shift();
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
            var randomPosition_1;
            do {
                randomPosition_1 = new Coordinate(Math.max(Math.round(Math.random() * 19) * 15, 15), Math.max(Math.round(Math.random() * 9) * 15, 15));
            } while (this.snake.segments.some(function (segment) { return randomPosition_1.equals(segment.position); }));
            this.fruit = new Fruit(this.context, randomPosition_1, this.settings.colors.fruit);
            this.fruit.render();
        }
        if (this.snake.segments.some(function (segment) { var _a; return !!((_a = _this.fruit) === null || _a === void 0 ? void 0 : _a.collidesWith(segment.position)); })) {
            this.snake.addSegment(this.snake.createSegment(this.settings.colors.body, 13));
            this.score.increment();
            this.fruit = null;
        }
        window.requestAnimationFrame(window.setTimeout.bind(window, this.tick.bind(this), 1000 / this.settings.speed));
    };
    Engine.prototype.checkCollision = function () {
        var _this = this;
        return this.snake.segments.some(function (segment) {
            if (segment.position.x < Boundary.LOWEST_HORIZONTAL || segment.position.x >= Boundary.HIGHEST_HORIZONTAL) {
                return true;
            }
            if (segment.position.y < Boundary.LOWEST_VERTICAL || segment.position.y >= Boundary.HIGHEST_VERTICAL) {
                return true;
            }
            return _this.snake.segments.some(function (other) { return (segment !== other &&
                segment.position.equals(other.position)); });
        });
    };
    Engine.prototype.renderField = function () {
        this.context.strokeStyle = this.settings.colors.border;
        this.context.beginPath();
        for (var x = Boundary.LOWEST_HORIZONTAL; x <= Boundary.HIGHEST_HORIZONTAL; x += 15) {
            this.context.moveTo(x, Boundary.LOWEST_VERTICAL);
            this.context.lineTo(x, Boundary.HIGHEST_VERTICAL);
            this.context.stroke();
        }
        for (var y = Boundary.LOWEST_VERTICAL; y <= Boundary.HIGHEST_VERTICAL; y += 15) {
            this.context.moveTo(Boundary.LOWEST_HORIZONTAL, y);
            this.context.lineTo(Boundary.HIGHEST_HORIZONTAL, y);
            this.context.stroke();
        }
    };
    Engine.prototype.finalizeSession = function (message) {
        var retry = confirm(message);
        this.history.register(new Date(), this.score.getValue());
        if (!retry) {
            return;
        }
        this.initialize(this.settings);
    };
    Engine.prototype.updateController = function () {
        if (!this.running) {
            return;
        }
        window.requestAnimationFrame(this.updateController.bind(this));
        var controller = navigator.getGamepads().find(function (gamepad) { return !!gamepad; });
        if (!controller) {
            return;
        }
        var currentDirection = this.inputQueue.at(-1) || this.snake.direction;
        var direction;
        var _a = controller.axes.map(Math.round), horizontalAxis = _a[0], verticalAxis = _a[1];
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
            var index = controller.buttons.findIndex(function (button) { return button.pressed; });
            var controllerMap = new Map([
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
    };
    Engine.prototype.setState = function (state) {
        this.state = state;
    };
    Engine.prototype.getCanvasContext = function () {
        return this.context;
    };
    return Engine;
}());

var Boundary;
(function (Boundary) {
    Boundary[Boundary["LOWEST_VERTICAL"] = 0] = "LOWEST_VERTICAL";
    Boundary[Boundary["LOWEST_HORIZONTAL"] = 0] = "LOWEST_HORIZONTAL";
    Boundary[Boundary["HIGHEST_VERTICAL"] = 150] = "HIGHEST_VERTICAL";
    Boundary[Boundary["HIGHEST_HORIZONTAL"] = 300] = "HIGHEST_HORIZONTAL";
})(Boundary || (Boundary = {}));
var KeyboardControlMap = /** @class */ (function () {
    function KeyboardControlMap() {
    }
    KeyboardControlMap.getDirection = function (keyCode) {
        var key = Array
            .from(KeyboardControlMap.map.keys())
            .find(function (keyCodes) { return keyCodes.includes(keyCode); });
        if (!key) {
            return null;
        }
        return KeyboardControlMap.map.get(key) || null;
    };
    KeyboardControlMap.map = new Map([
        [['KeyW', 'ArrowUp'], Direction.up()],
        [['KeyA', 'ArrowLeft'], Direction.left()],
        [['KeyD', 'ArrowRight'], Direction.right()],
        [['KeyS', 'ArrowDown'], Direction.down()]
    ]);
    return KeyboardControlMap;
}());

;// CONCATENATED MODULE: ./asset/l10n/messages.json
const messages_namespaceObject = /*#__PURE__*/JSON.parse('{"en":{"SCORE":"Score","SPEED":"Speed","ATTEMPTS":"Attempts","SETTINGS":"Settings","START":"New Game","DATE":"Date","SNAKE":"Snake","SCALE":"Scale","HEAD_COLOR":"Snake\'s head color","BODY_COLOR":"Snake\'s body color","FRUIT_COLOR":"Fruit color","BORDER_COLOR":"Border color","GAME_OVER":"Game Over. Retry?","VICTORY":"You won! Play again?","RESET":"Reset"},"ru":{"SCORE":"Очки","SPEED":"Скорость","ATTEMPTS":"Попытки","SETTINGS":"Настройки","START":"Новая Игра","DATE":"Дата","SNAKE":"Змейка","SCALE":"Размер","HEAD_COLOR":"Цвет головы змейки","BODY_COLOR":"Цвет тела змейки","FRUIT_COLOR":"Цвет фрукта","BORDER_COLOR":"Цвет границ","GAME_OVER":"Игра окончена. Попробовать ещё раз?","VICTORY":"Вы победили! Сыграть ещё раз?","RESET":"Сбросить"}}');
var l10n_messages_namespaceObject = /*#__PURE__*/__webpack_require__.t(messages_namespaceObject, 2);
;// CONCATENATED MODULE: ./src/localization.ts

var Localization = /** @class */ (function () {
    function Localization() {
        this.locale = new Intl.Locale(navigator.language);
        this.dateFormatter = new Intl.DateTimeFormat(this.locale.maximize().language, {
            dateStyle: 'medium',
            timeStyle: 'medium',
        });
        var dictionary = new Map();
        Object.entries(l10n_messages_namespaceObject).forEach(function (entry) {
            var language = entry[0], languageMessages = entry[1];
            var map = new Map();
            Object.entries(languageMessages).forEach(function (entry) {
                var code = entry[0], localized = entry[1];
                map.set(code, localized);
            });
            dictionary.set(language, map);
        });
        this.dictionary = dictionary;
    }
    Localization.prototype.initialize = function (querySelector) {
        var _this = this;
        return new Promise(function (resolve) {
            var elements = document.querySelectorAll(querySelector);
            elements.forEach(function (element) {
                element.innerHTML = element.innerHTML.replace(/\{\{(.*)}}/, function (matches, p1) { return _this.getMessage(p1); });
            });
            resolve();
        });
    };
    Localization.prototype.getMessage = function (code) {
        var info = this.locale.maximize();
        var language = this.dictionary.has(info.language) ? info.language : Localization.DEFAULT_LANGUAGE;
        var locales = this.dictionary.get(language);
        if (!(locales === null || locales === void 0 ? void 0 : locales.has(code))) {
            return code;
        }
        return locales.get(code) || code;
    };
    Localization.prototype.formatDate = function (date) {
        return this.dateFormatter.format(date);
    };
    Localization.DEFAULT_LANGUAGE = 'en';
    return Localization;
}());


;// CONCATENATED MODULE: ./src/settings.ts
var Settings = /** @class */ (function () {
    function Settings(colors, speed) {
        this.colors = colors;
        this.speed = speed;
    }
    Settings.createFromNode = function (node) {
        var form = new FormData(node);
        return new Settings(new ColorScheme(form.get('head_color'), form.get('body_color'), form.get('fruit_color'), form.get('border_color')), Number.parseInt(form.get('speed')));
    };
    return Settings;
}());

var ColorScheme = /** @class */ (function () {
    function ColorScheme(head, body, fruit, border) {
        this.head = head;
        this.body = body;
        this.fruit = fruit;
        this.border = border;
    }
    return ColorScheme;
}());

;// CONCATENATED MODULE: ./src/history.ts
var History = /** @class */ (function () {
    function History(scoreBoard, localization) {
        this.scoreBoard = scoreBoard;
        this.localization = localization;
    }
    History.prototype.reset = function () {
        localStorage.removeItem(History.HISTORY_KEY);
        this.clear();
    };
    History.prototype.register = function (timestamp, score) {
        var items = this.retrieve();
        items.push(new Item(timestamp, score));
        items = items
            .sort(function (item, other) { return other.score - item.score; })
            .slice(0, 10);
        this.persist(items);
        this.render();
    };
    History.prototype.clear = function () {
        var _this = this;
        var entries = this.scoreBoard.querySelectorAll("[data-type=".concat(Item.DATA_TYPE, "]"));
        Array.from(entries).forEach(function (entry) {
            _this.scoreBoard.removeChild(entry);
        });
    };
    History.prototype.render = function () {
        var _this = this;
        this.clear();
        this.retrieve()
            .sort(function (item, other) { return other.score - item.score; })
            .forEach(function (item, index) {
            _this.scoreBoard.appendChild(item.render(_this.localization, index + 1));
        });
    };
    History.prototype.retrieve = function () {
        var history = localStorage.getItem(History.HISTORY_KEY);
        if (!history) {
            return [];
        }
        var items = JSON.parse(history);
        return items.map(Item.create);
    };
    History.prototype.persist = function (items) {
        localStorage.setItem(History.HISTORY_KEY, JSON.stringify(items.map(function (item) {
            return {
                timestamp: item.timestamp.valueOf(),
                score: item.score
            };
        })));
    };
    History.HISTORY_KEY = 'history';
    return History;
}());

var Item = /** @class */ (function () {
    function Item(timestamp, score) {
        this.timestamp = timestamp;
        this.score = score;
    }
    Item.create = function (item) {
        return new Item(new Date(item.timestamp), item.score);
    };
    Item.prototype.render = function (localization, position) {
        var row = document.createElement('tr');
        row.dataset.type = Item.DATA_TYPE;
        switch (position) {
            case 1:
                row.classList.add('bg-yellow-400');
                break;
            case 2:
                row.classList.add('bg-gray-400');
                break;
            case 3:
                row.classList.add('bg-orange-400');
                break;
        }
        row.appendChild(this.renderTimestamp(localization));
        row.appendChild(this.renderScore());
        return row;
    };
    Item.prototype.renderScore = function () {
        var score = document.createElement('td');
        score.classList.add('border', 'border-solid', 'border-black', 'p-1', 'text-right', 'px-3');
        score.innerText = this.score.toString();
        return score;
    };
    Item.prototype.renderTimestamp = function (localization) {
        var timestamp = document.createElement('td');
        timestamp.classList.add('border', 'border-solid', 'border-black', 'p-1', 'px-3');
        timestamp.innerText = localization.formatDate(this.timestamp);
        return timestamp;
    };
    Item.DATA_TYPE = 'history-entry';
    return Item;
}());

;// CONCATENATED MODULE: ./src/index.ts




var Freezemage = {
    Engine: Engine,
    Localization: Localization,
    Settings: Settings,
    History: History
};

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map