import {Localization} from "./localization";

export class History {
    private static readonly HISTORY_KEY: string = 'history';

    public constructor(
            private readonly scoreBoard: HTMLTableElement,
            private readonly localization: Localization
    ) {
    }

    public reset(): void {
        localStorage.removeItem(History.HISTORY_KEY);

        this.clear();
    }

    public register(timestamp: Date, score: number): void {
        let items: Array<Item> = this.retrieve();

        items.push(new Item(timestamp, score));
        items = items
                .sort((item: Item, other: Item): number => other.score - item.score)
                .slice(0, 10);

        this.persist(items);

        this.render();
    }

    private clear(): void {
        const entries: NodeListOf<Element> = this.scoreBoard.querySelectorAll(`[data-type=${Item.DATA_TYPE}]`);
        Array.from(entries).forEach((entry: Element): void => {
            this.scoreBoard.removeChild(entry);
        });
    }

    public render(): void {
        this.clear();

        this.retrieve()
            .sort((item: Item, other: Item): number => other.score - item.score)
            .forEach((item: Item, index: number): void => {
                this.scoreBoard.appendChild(item.render(this.localization, index + 1));
            });
    }

    private retrieve(): Array<Item> {
        const history = localStorage.getItem(History.HISTORY_KEY);
        if (!history) {
            return [];
        }

        const items: Array<{ timestamp: number, score: number }> = JSON.parse(history);

        return items.map(Item.create);
    }

    private persist(items: Array<Item>): void {
        localStorage.setItem(
            History.HISTORY_KEY,
            JSON.stringify(
                items.map((item: Item): {timestamp: number, score: number} => {
                    return {
                        timestamp: item.timestamp.valueOf(),
                        score: item.score
                    }
                })
            )
        );
    }
}

class Item {
    public static readonly DATA_TYPE: string = 'history-entry';

    public constructor(
            public readonly timestamp: Date,
            public readonly score: number
    ) {
    }

    public static create(item: { timestamp: number, score: number }): Item {
        return new Item(new Date(item.timestamp), item.score);
    }

    public render(localization: Localization, position: number): HTMLElement {
        const row: HTMLTableRowElement = document.createElement('tr');

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
    }

    private renderScore(): HTMLTableCellElement {
        const score: HTMLTableCellElement = document.createElement('td');
        score.classList.add('border', 'border-solid', 'border-black', 'p-1', 'text-right', 'px-3');
        score.innerText = this.score.toString();

        return score;
    }

    private renderTimestamp(localization: Localization): HTMLTableCellElement {
        const timestamp: HTMLTableCellElement = document.createElement('td');
        timestamp.classList.add('border', 'border-solid', 'border-black', 'p-1', 'px-3');
        timestamp.innerText = localization.formatDate(this.timestamp);

        return timestamp;
    }
}
