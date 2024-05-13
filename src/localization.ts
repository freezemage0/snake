import * as messages from '../asset/l10n/messages.json';

export class Localization {
    private static readonly DEFAULT_LANGUAGE: string = 'en';

    private locale: Intl.Locale;
    private dateFormatter: Intl.DateTimeFormat;
    private dictionary: Map<string, Map<string, string>>;

    public constructor() {
        this.locale = new Intl.Locale(navigator.language);
        this.dateFormatter = new Intl.DateTimeFormat(
                this.locale.maximize().language,
                {
                    dateStyle: 'medium',
                    timeStyle: 'medium',
                }
        );

        const dictionary: Map<string, Map<string, string>> = new Map();
        Object.entries(messages).forEach((entry): void => {
            const [language, languageMessages] = entry;
            const map: Map<string, string> = new Map();

            Object.entries(languageMessages).forEach((entry): void => {
                const [code, localized] = entry;
                map.set(code, localized);
            });

            dictionary.set(language, map);
        });

        this.dictionary = dictionary;
    }

    public initialize(querySelector: string): Promise<void> {
        return new Promise((resolve: Function): void => {
            const elements: NodeListOf<Element> = document.querySelectorAll(querySelector);

            elements.forEach((element: Element): void => {
                element.innerHTML = element.innerHTML.replace(
                    /\{\{(.*)}}/,
                    (matches: string, p1) => this.getMessage(p1)
                );
            });

            resolve();
        });
    }

    public getMessage(code: string): string {
        const info = this.locale.maximize();

        const language = this.dictionary.has(info.language) ? info.language : Localization.DEFAULT_LANGUAGE;

        const locales = this.dictionary.get(language);
        if (!locales?.has(code)) {
            return code;
        }

        return locales.get(code) || code;
    }

    public formatDate(date: Date): string {
        return this.dateFormatter.format(date);
    }
}
