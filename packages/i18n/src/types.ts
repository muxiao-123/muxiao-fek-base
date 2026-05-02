export type Locale = string;

export interface LocaleMessages {
  [key: string]: string | LocaleMessages;
}

export interface I18nOptions {
  baseLocale: Locale;
  localeOverrides?: Partial<Record<Locale, LocaleMessages>>;
}

export interface I18nInstance {
  locale: Locale;
  t(key: string, params?: Record<string, string | number>): string;
  setLocale(locale: Locale): void;
  getLocale(): Locale;
  getAvailableLocales(): Locale[];
}

export type CreateI18n = (options: I18nOptions) => I18nInstance;