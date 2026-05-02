import type { CreateI18n, I18nInstance, Locale, LocaleMessages } from "./types";

const DEFAULT_LOCALE = "zh-CN";

const COMMON_MESSAGES: Record<Locale, LocaleMessages> = {
  "zh-CN": {
    common_submit: "提交",
    common_cancel: "取消",
    common_confirm: "确认",
    common_delete: "删除",
    common_edit: "编辑",
    common_save: "保存",
    common_search: "搜索",
    common_reset: "重置",
    common_loading: "加载中...",
    common_no_data: "暂无数据",
    common_success: "操作成功",
    common_error: "操作失败",
    common_warning: "警告",
    common_info: "提示",
  },
  "en-US": {
    common_submit: "Submit",
    common_cancel: "Cancel",
    common_confirm: "Confirm",
    common_delete: "Delete",
    common_edit: "Edit",
    common_save: "Save",
    common_search: "Search",
    common_reset: "Reset",
    common_loading: "Loading...",
    common_no_data: "No Data",
    common_success: "Success",
    common_error: "Error",
    common_warning: "Warning",
    common_info: "Info",
  },
};

function getNestedValue(obj: LocaleMessages, path: string): string {
  const keys = path.split(".");
  let result: LocaleMessages | string | undefined = obj;
  for (const key of keys) {
    if (typeof result === "object" && result !== null && key in result) {
      result = result[key];
    } else {
      return path;
    }
  }
  return typeof result === "string" ? result : path;
}

export const createI18n: CreateI18n = ({
  baseLocale,
  localeOverrides = {},
}) => {
  let currentLocale = baseLocale || DEFAULT_LOCALE;

  const allMessages: Record<Locale, LocaleMessages> = {
    [DEFAULT_LOCALE]: COMMON_MESSAGES[DEFAULT_LOCALE] || {},
    ...Object.fromEntries(
      Object.entries(COMMON_MESSAGES).map(([locale, messages]) => [
        locale,
        { ...messages },
      ]),
    ),
  };

  for (const [locale, messages] of Object.entries(localeOverrides) as [
    Locale,
    LocaleMessages,
  ][]) {
    const existing = allMessages[locale];
    if (existing) {
      (allMessages as Record<string, LocaleMessages>)[locale] = {
        ...existing,
        ...messages,
      };
    } else {
      (allMessages as Record<string, LocaleMessages>)[locale] = messages;
    }
  }

  const instance: I18nInstance = {
    get locale() {
      return currentLocale;
    },

    t(key: string, params?: Record<string, string | number>): string {
      const messages =
        allMessages[currentLocale] ??
        allMessages[DEFAULT_LOCALE] ??
        ({} as LocaleMessages);
      let text = getNestedValue(messages, key);

      if (params) {
        Object.entries(params).forEach(([paramKey, value]) => {
          text = text.replace(
            new RegExp(`\\{${paramKey}\\}`, "g"),
            String(value),
          );
        });
      }

      return text;
    },

    setLocale(locale: Locale): void {
      if (allMessages[locale]) {
        currentLocale = locale;
      }
    },

    getLocale(): Locale {
      return currentLocale;
    },

    getAvailableLocales(): Locale[] {
      return Object.keys(allMessages);
    },
  };

  return instance;
};
