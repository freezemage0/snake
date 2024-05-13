export class Score {
    private node: HTMLElement;
    private value: number;

    public constructor(node: HTMLElement, value: number) {
        this.node = node;
        this.value = value;
    }

    public increment(): void {
        this.value += 1;
        this.update();
    }

    public getValue(): number {
        return this.value;
    }

    public update(): void {
        this.node.innerHTML = this.value.toString();
    }

    public reset(): void {
        this.value = 0;
        this.update();
    }
}
