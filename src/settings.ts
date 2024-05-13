export class Settings {
    public constructor(
        public readonly colors: ColorScheme,
        public readonly speed: number
    ) {
    }

    public static createFromNode(node: HTMLFormElement): Settings {
        const form: FormData = new FormData(node);

        return new Settings(
            new ColorScheme(
                    form.get('head_color') as string,
                    form.get('body_color') as string,
                    form.get('fruit_color') as string,
                    form.get('border_color') as string
            ),
            Number.parseInt(form.get('speed') as string),
        );
    }
}

class ColorScheme {
    public constructor(
            public readonly head: string,
            public readonly body: string,
            public readonly fruit: string,
            public readonly border: string
    ) {
    }
}
