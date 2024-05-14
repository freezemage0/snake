import {Engine} from './engine';
import {Localization} from "./localization";
import {Settings} from "./settings";
import {History} from "./history";
import {Finder} from "./finder";

const finder = new Finder();

const localization = new Localization();
localization.initialize('[data-localized]').then(() => {
    const container = finder.findByQuerySelector('.container');
    container.classList.remove('hidden');
    container.classList.add('flex');
});

const form = document.forms.namedItem('settings');
if (!form) {
    throw new Error('Settings form not found.');
}

const history = new History(
        finder.findByQuerySelector('[data-role="score-board"]') as HTMLTableElement,
        localization
);
history.render();

const engine = new Engine(
        finder.findById('application') as HTMLCanvasElement,
        finder.findByQuerySelector('[data-role="score-counter"]') as HTMLElement,
        localization,
        Settings.createFromNode(form),
        history
);

const startButton: HTMLButtonElement = finder.findById('start') as HTMLButtonElement;
startButton.onclick = (event: MouseEvent): void => {
    event.preventDefault();

    engine.stop();
    engine.initialize(Settings.createFromNode(form));
    engine.run();
}

const resetButton: HTMLButtonElement = finder.findById('reset') as HTMLButtonElement;
resetButton.onclick = (event: MouseEvent): void => {
    event.preventDefault();

    history.reset();
}