export class Localization {
    private locale: Intl.Locale;
    private dateFormatter: Intl.DateTimeFormat;
    private dictionary: Map<string, Map<string, string>>;

    constructor(dictionary: Map<string, Map<string, string>>) {
        this.locale = new Intl.Locale(navigator.language);
        this.dateFormatter = new Intl.DateTimeFormat(
                this.locale.maximize().language,
                {
                    dateStyle: 'medium',
                    timeStyle: 'medium',
                }
        );
        this.dictionary = dictionary;
    }

    getMessage(code: string) {
        const info = this.locale.maximize();

        if (!this.dictionary.has(info.language)) {
            return code;
        }

        const locales = this.dictionary.get(info.language);
        if (!locales || !locales.has(code)) {
            return code;
        }

        return locales.get(code);
    }

    formatDate(date: Date) {
        return this.dateFormatter.format(date);
    }
}

export const Messages = new Map(
    [
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
    ]
);
