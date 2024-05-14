export class Finder {
    public constructor(
            private readonly root: ParentNode = document
    ) {
    }

    public findByQuerySelector(querySelector: string): Element {
        const element = this.root.querySelector(querySelector);
        if (!element) {
            throw new Error(`No elements that satisfy ${querySelector} selector.`);
        }
        return element;
    }

    public findById(elementId: string): Element {
        const element = document.getElementById(elementId);
        if (!element) {
            throw new Error(`Element with id ${elementId} not found.`);
        }
        return element;
    }
}